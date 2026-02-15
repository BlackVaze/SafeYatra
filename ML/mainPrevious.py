# from fastapi import FastAPI
# from pydantic import BaseModel
# from safe_route import get_safest_route, get_alt_routes
# from fastapi.middleware.cors import CORSMiddleware
# import uvicorn

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # You can specify specific domains instead of "*"
#     allow_credentials=True,
#     allow_methods=["*"],  # Allows all methods: GET, POST, OPTIONS, etc.
#     allow_headers=["*"],  # Allows all headers
# )


# @app.get("/")
# def home():
#     return {'health check': 'ok'}

# class coordinates(BaseModel):
#     start:list
#     end:list

# @app.post('/safe_route')
# def predict_route(data : coordinates):
#     start_lat, start_lon=data.start
#     end_lat, end_lon=data.end

#     origin=[start_lon, start_lat]
#     destination=[end_lon, end_lat]

#     route = get_safest_route(origin, destination)

#     return {"route": route}


# @app.post('/alt_route')
# def predict_alt_route(data : coordinates):
#     start_lat, start_lon=data.start
#     end_lat, end_lon=data.end

#     origin=[start_lon, start_lat]
#     destination=[end_lon, end_lat]

#     route = get_alt_routes(origin, destination)

#     if(len(route)==1):
#         return {"route": route[0]}
    
#     if(len(route)==0):
#         return {"route": [[]]}
    
#     if(len(route)==2):
#         return {"route-1": route[0],
#                 "route-2":route[1]}
    
#     if(len(route)==3):
#         return {"route-1": route[0],
#                 "route-2":route[1],
#                 "route-3":route[2]}