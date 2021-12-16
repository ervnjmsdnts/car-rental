from fastapi import APIRouter, Depends

from app.config.db import user_collection
from app.config.auth import current_user

from app.models.user_model import User

from bson import ObjectId

user_router = APIRouter(prefix="/user", tags=["user"])

def user_helper(user):
    return {
        "id": str(user["_id"]),
        "email": user["email"]
    }

@user_router.get("/all")
async def get_all_users():
    users = []
    async for user in user_collection.find():
        users.append(user_helper(user))
    
    return users
    
@user_router.get("/one/{user_id}")
async def get_user(user_id: str):
    user = await user_collection.find_one({"_id": ObjectId(user_id)})

    if user:
        return user_helper(user)

@user_router.get("")
async def get_current_user(user: User = Depends(current_user)):
    current_user = await user_collection.find_one({"id": user.id})

    if current_user:
        return user_helper(current_user)
