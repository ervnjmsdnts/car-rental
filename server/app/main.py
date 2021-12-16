from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.auth import fastapi_users,jwt_authentication

from app.routes import car_route, rental_route, user_route

import cloudinary

app = FastAPI()

cloudinary.config( 
  cloud_name = "dnu26lfxx", 
  api_key = "918513779441541", 
  api_secret = "pqxQt5idAfQPRyWumP4qZ31-n1k" 
)

origins = ["*"]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

app.include_router(fastapi_users.get_auth_router(jwt_authentication), prefix="/auth/jwt", tags=["auth"])
app.include_router(fastapi_users.get_register_router(), prefix="/auth", tags=["auth"])
app.include_router(user_route.user_router)
app.include_router(car_route.car_router)
app.include_router(rental_route.rental_router)