import threading
import time

from functools import partial as curry

from django.conf import settings
from django.db.models.signals import pre_save
from django.apps import apps
from auditlog.models import LogEntry

from auth.utils import DjangoReduxJWTAuthentication

from django.utils.deprecation import MiddlewareMixin

thread_local = threading.local()


class AuditLogMiddleware(MiddlewareMixin):

    def process_request(self, request):
        # Initialize thread local storage
        thread_local.audit_log = {
            "signal_duid": (self.__class__, time.time()),
            "remote_addr": request.META.get("REMOTE_ADDR"),
        }

        if request.META.get("HTTP_X_FORWARDED_FOR"):
            thread_local.audit_log["remote_addr"] = request.META.get(
                "HTTP_X_FORWARDED_FOR"
            ).split(",")[0]

        auth = DjangoReduxJWTAuthentication().authenticate(request)

        if auth:
            user, _ = auth
            set_actor = curry(
                self.set_actor,
                user=user,
                signal_duid=thread_local.audit_log["signal_duid"],
            )
            pre_save.connect(
                set_actor,
                sender=LogEntry,
                dispatch_uid=thread_local.audit_log["signal_duid"],
                weak=False,
            )

    def process_response(self, request, response):
        if hasattr(thread_local, "audit_log"):
            pre_save.disconnect(
                sender=LogEntry, dispatch_uid=thread_local.audit_log["signal_duid"]
            )

        return response

    def process_exception(self, request, exception):
        if hasattr(thread_local, "audit_log"):
            pre_save.disconnect(
                sender=LogEntry, dispatch_uid=thread_local.audit_log["signal_duid"]
            )

        return None

    @staticmethod
    def set_actor(user, sender, instance, signal_duid, **kwargs):
        if hasattr(thread_local, "audit_log"):
            if signal_duid != thread_local.audit_log["signal_duid"]:
                return
            try:
                app_label, model_name = settings.AUTH_USER_MODEL.split(".")
                auth_user_model = apps.get_model(app_label, model_name)
            except ValueError:
                auth_user_model = apps.get_model("auth", "user")
            if (
                sender == LogEntry
                and isinstance(user, auth_user_model)
                and instance.actor is None
            ):
                instance.actor = user

            instance.remote_addr = thread_local.audit_log["remote_addr"]
