from fastapi import APIRouter, Body, UploadFile, File
from fastapi.encoders import jsonable_encoder

import cloudinary.uploader

from bson import ObjectId

from app.models.car_model import Car, CarUpdate
from app.config.db import car_collection

car_router = APIRouter(prefix="/car", tags=["car"])

def car_helper(car) -> dict:
    return {
        "id": str(car["_id"]),
        "image": car["image"],
        "name": car["name"],
        "type": car["type"],
        "price": car["price"]
    }

@car_router.get("")
async def get_all_cars():
    cars = []
    async for car in car_collection.find():
        cars.append(car_helper(car))

    return cars

@car_router.get("/{car_id}")
async def get_car(car_id: str):
    car = await car_collection.find_one({"_id": ObjectId(car_id)})

    if car:
        return car_helper(car)

@car_router.post("")
async def create_car(car: Car):
    data = jsonable_encoder(car)

    new_car = await car_collection.insert_one(data)
    get_car = await car_collection.find_one({"_id": new_car.inserted_id})

    return car_helper(get_car)

@car_router.put("/image/{car_id}")
async def add_image_to_car(car_id: str, file: UploadFile = File(...)):
    car = await car_collection.find_one({"_id": ObjectId(car_id)})

    result = cloudinary.uploader.upload(file.file)
    url = result.get("url")

    if car:
        updated_car = await car_collection.update_one({"_id": ObjectId(car_id)}, {"$set": {"image": url}})

        if updated_car:
            return "Added image to car"

        return "No image has been added"

@car_router.put("/{car_id}")
async def edit_car(car_id: str, data: CarUpdate = Body(...)):
    encoded_data = jsonable_encoder(data)
    car = await car_collection.find_one({"_id": ObjectId(car_id)})

    if car:
        updated_car = await car_collection.update_one({"_id": ObjectId(car_id)}, {"$set": encoded_data})

        if updated_car:
            return "Car has been updated"
        
        return "Car has not been updated"

@car_router.delete("/{car_id}")
async def delete_car(car_id: str):
    car = await car_collection.find_one({"_id": ObjectId(car_id)})

    if car:
        await car_collection.delete_one({"_id": ObjectId(car_id)})

    return "Car has been deleted"