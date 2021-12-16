from fastapi_users_db_mongodb import MongoDBUserDatabase
from motor.motor_asyncio import AsyncIOMotorClient
from app.models.user_model import UserDB

DATABASE_URL = "mongodb://localhost:27017"

client = AsyncIOMotorClient(DATABASE_URL, uuidRepresentation="standard")

db = client["retal"]

user_collection = db["users"]
car_collection = db["cars"]
rental_collection = db["rentals"]

async def get_user_db():
    yield MongoDBUserDatabase(UserDB, user_collection)