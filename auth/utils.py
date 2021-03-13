import jwt

from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import get_user_model
from django.conf import settings

from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from rest_framework_simplejwt.authentication import JWTAuthentication


class DjangoReduxJWTAuthentication(BaseAuthentication):

    def authenticate(self, request):
        User = get_user_model()
        authorization_heaader = request.headers.get('Authorization')

        if not authorization_heaader:
            return None
        try:
            access_token = authorization_heaader.split(' ')[1]
            payload = jwt.decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed(_('access token expired'))
        except IndexError:
            raise AuthenticationFailed(_('token prefix missing'))

        user = User.objects.filter(id=payload['user_id']).first()
        if user is None:
            raise AuthenticationFailed(_('user not found'))

        if not user.is_active:
            raise AuthenticationFailed(_('user is inactive'))

        return user, payload
