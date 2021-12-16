from typing import Optional
from pydantic import BaseModel

class Car(BaseModel):
    image: str
    name: str
    type: str
    price: float

class CarUpdate(BaseModel):
    image: Optional[str]
    name: Optional[str]
    type: Optional[str]
    price: Optional[float]