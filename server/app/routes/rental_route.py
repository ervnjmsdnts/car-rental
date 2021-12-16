from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from app.models.rental_model import Rental, RentalUpdate
from app.config.db import rental_collection

from bson import ObjectId

rental_router = APIRouter(prefix="/rental", tags=["rental"])

def rental_helper(rental):
    return {
        "id": str(rental["_id"]),
        "user": rental["user"],
        "car": rental["car"],
        "pickUpDate": rental["pickUpDate"],
        "returnDate": rental["returnDate"],
        "total": rental["total"]
    }

@rental_router.get("")
async def get_all_rentals():
    rentals = []
    async for rental in rental_collection.find():
        rentals.append(rental_helper(rental))
    
    return rentals

@rental_router.get("/user/{user_id}")
async def get_rentals_user(user_id: str):
    user_rentals = []
    async for user_rental in rental_collection.find({"user": {"$eq": user_id}}):
        user_rentals.append(rental_helper(user_rental))
    
    return user_rentals

@rental_router.get("/{rental_id}")
async def get_rental(rental_id: str):
    rental = await rental_collection.find_one({"_id": ObjectId(rental_id)})

    if rental:
        return rental_helper(rental)

@rental_router.post("")
async def create_rental(rental: Rental):
    data = jsonable_encoder(rental)

    new_rental = await rental_collection.insert_one(data)
    get_rental = await rental_collection.find_one({"_id": new_rental.inserted_id})

    return rental_helper(get_rental)

@rental_router.put("/{rental_id}")
async def edit_rental(rental_id: str, data: RentalUpdate = Body(...)):
    encoded_data = jsonable_encoder(data)
    rental = await rental_collection.find_one({"_id": ObjectId(rental_id)})

    if rental:
        updated_rental = await rental_collection.update_one({"_id": ObjectId(rental_id)}, {"$set": encoded_data})

        if updated_rental:
            return "Rental has been updated"

        return "Rental has not been updated"

@rental_router.delete("/{rental_id}")
async def delete_rental(rental_id: str):
    rental = await rental_collection.find_one({"_id": ObjectId(rental_id)})

    if rental:
        await rental_collection.delete_one({"_id": ObjectId(rental_id)})

    return "Rental has been deleted"