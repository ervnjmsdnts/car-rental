from typing import Union
from fastapi import Depends

from fastapi_users.authentication.jwt import JWTAuthentication
from fastapi_users.manager import BaseUserManager, InvalidPasswordException
from fastapi_users.fastapi_users import FastAPIUsers

from app.models.user_model import UserCreate, UserDB, User, UserUpdate

from .db import get_user_db

JWT_SECRET = "SECRET"
MANAGER_SECRET = "SUPERSECRET"


class UserManager(BaseUserManager[UserCreate, UserDB]):
    user_db_model = UserDB
    verification_token_secret = MANAGER_SECRET

    async def validate_password(self, password: str, user: Union[UserCreate, UserDB]) -> None:
        if password != user.confirmPassword:
            raise InvalidPasswordException(reason="Passwords don't match")

async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)
    

jwt_authentication = JWTAuthentication(secret=JWT_SECRET, lifetime_seconds=604800, tokenUrl="auth/jwt/login")

fastapi_users = FastAPIUsers(get_user_manager, [jwt_authentication], User, UserCreate, UserUpdate, UserDB)

current_user = fastapi_users.current_user(active=True)
super_user = fastapi_users.current_user(active=True, superuser=True)