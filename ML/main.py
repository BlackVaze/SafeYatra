import pandas as pd
import osmnx as ox
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Tuple
from fastapi.middleware.cors import CORSMiddleware
from safe_route import get_safest_route, get_alt_routes

app = FastAPI()

origins = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:3000",  # React dev server
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],   # Important: includes OPTIONS automatically
    allow_headers=["*"],
)

graph = None
GRAPH_FILEPATH_MAIN = "chicago_final_graph_with_lights.graphml"

@app.on_event("startup")
def initial_load():
    """ Loads the base graph. """
    global graph
    print("Loading base street network graph...")
    try:
        graph = ox.load_graphml(filepath=GRAPH_FILEPATH_MAIN)
        print("✅ Base graph loaded.")
    except FileNotFoundError:
        print(f"❌ FATAL ERROR: Graph file not found at {GRAPH_FILEPATH_MAIN}.")
        graph = None
    except Exception as e:
        print(f"❌ FATAL ERROR: Could not load graph. Error: {e}")
        graph = None

class RouteRequest(BaseModel):
    start: Tuple[float, float] # lat, lon
    end: Tuple[float, float]   # lat, lon
    alpha: float = 0.7

# --- API Endpoints ---
@app.get("/")
def home():
    return {"Welcome to SafeYatra: Confidence in every step"}

@app.post('/safe_route')
def predict_safest_route(data: RouteRequest):
    if graph is None: return {"error": "Graph not loaded."}
    origin = (data.start[1], data.start[0]) # lon, lat
    destination = (data.end[1], data.end[0]) # lon, lat
    route = get_safest_route(graph, origin, destination, data.alpha)
    if route:
        return {"safest_route": route}
    else:
        return {"error": "Could not find a route."}

@app.post('/alt_route')
def predict_alternate_routes(data: RouteRequest):
    if graph is None: return {"error": "Graph not loaded."}
    origin = (data.start[1], data.start[0]) # lon, lat
    destination = (data.end[1], data.end[0]) # lon, lat
    alt_routes = get_alt_routes(graph, origin, destination, data.alpha)
    return {"alternate_routes": alt_routes}

