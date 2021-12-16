from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from .car_model import Car

class Rental(BaseModel):
    user: str 
    car: str
    pickUpDate: datetime
    returnDate: datetime
    total: float

class RentalUpdate(BaseModel):
    user: Optional[str]
    car: Optional[str]
    pickUpDate: Optional[datetime]
    returnData: Optional[datetime]
    total: Optional[float]