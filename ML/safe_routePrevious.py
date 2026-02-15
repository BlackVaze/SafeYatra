import requests
from model.ml_model import predict_score

#all coords in form of lon,lat

#ml model requires in form lat,lon

def get_routes(start, end):    
    print('\n\n')
    url = f"https://router.project-osrm.org/route/v1/car/{start[0]},{start[1]};{end[0]},{end[1]}?alternatives=true&overview=full&geometries=geojson"
    
    response = requests.get(url)
    data = response.json()
    

    routes=[]
    distances=[]
    if "routes" in data:
        route_data = data["routes"][:4]  # Get up to 4 routes

    # Store each route separately
        for route in route_data:
            route_coords = route["geometry"]["coordinates"]
            routes.append(route_coords)
            
    return routes

def avg_safety_score(route):

    score = 0

    for lon, lat in route:
        score = score+predict_score(lat, lon)
    
    return score/len(route)

def safest_route(routes):
    
    safety_scores=[avg_safety_score(route) for route in routes]

    safest_index = safety_scores.index(min(safety_scores))

    alternative_routes = routes[:safest_index] + routes[safest_index+1:]

    return routes[safest_index], alternative_routes

def get_safest_route(start, end):

    try:    
        routes = get_routes(start, end)

        safe_route, alt_routes =safest_route(routes)

        l=[] #Extract coordinates
        for lon, lat in safe_route:
            l.append([lat,lon])
    
        return l
    except:
        return 0

def get_alt_routes(start, end):

    try:    
        routes=get_routes(start, end)

        safe_route, alt_routes = safest_route(routes)

        new_routes=[]
        for route in alt_routes:
            l=[]
            for lon, lat in route:
                l.append([lat,lon])
            new_routes.append(l)
        return new_routes
    
    except:
        return 0
    

get_routes([-118.302,34.5010],[-118.201,34.5201])

    