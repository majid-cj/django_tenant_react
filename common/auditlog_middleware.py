import threading
import time

from django.conf import settings
from django.db.models.signals import pre_save
from django.utils.functional import curry
from django.apps import apps
from auditlog.models import LogEntry

from auth.utils import DjangoReduxJWTAuthentication

from django.utils.deprecation import MiddlewareMixin

threadlocal = threading.local()


class AuditlogMiddleware(MiddlewareMixin):

    def process_request(self, request):
        # Initialize thread local storage
        threadlocal.auditlog = {
            'signal_duid': (self.__class__, time.time()),
            'remote_addr': request.META.get('REMOTE_ADDR'),
        }

        if request.META.get('HTTP_X_FORWARDED_FOR'):
            threadlocal.auditlog['remote_addr'] = request.META.get('HTTP_X_FORWARDED_FOR').split(',')[0]

        auth = DjangoReduxJWTAuthentication().authenticate(request)

        if auth:
            user, _ = auth
            set_actor = curry(self.set_actor, user=user, signal_duid=threadlocal.auditlog['signal_duid'])
            pre_save.connect(set_actor, sender=LogEntry, dispatch_uid=threadlocal.auditlog['signal_duid'], weak=False)

    def process_response(self, request, response):
        if hasattr(threadlocal, 'auditlog'):
            pre_save.disconnect(sender=LogEntry, dispatch_uid=threadlocal.auditlog['signal_duid'])

        return response

    def process_exception(self, request, exception):
        if hasattr(threadlocal, 'auditlog'):
            pre_save.disconnect(sender=LogEntry, dispatch_uid=threadlocal.auditlog['signal_duid'])

        return None

    @staticmethod
    def set_actor(user, sender, instance, signal_duid, **kwargs):
        if hasattr(threadlocal, 'auditlog'):
            if signal_duid != threadlocal.auditlog['signal_duid']:
                return
            try:
                app_label, model_name = settings.AUTH_USER_MODEL.split('.')
                auth_user_model = apps.get_model(app_label, model_name)
            except ValueError:
                auth_user_model = apps.get_model('auth', 'user')
            if sender == LogEntry and isinstance(user, auth_user_model) and instance.actor is None:
                instance.actor = user

            instance.remote_addr = threadlocal.auditlog['remote_addr']
