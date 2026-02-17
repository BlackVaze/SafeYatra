SafeYatra is a full-stack navigation web application built during my first hackathon.
It combines React + Leaflet for interactive maps with a backend API and an ML microservice to recommend optimized and safety-aware routes.

The goal was to build a Google Maps–style routing system — enhanced with intelligent route analysis.

Key Features:
1. Interactive map rendering with Leaflet
2. Source & destination search
3. Dynamic route calculation
4. ML-powered safest route analysis (FastAPI)
5. Authentication & secure API integration
6. Fully deployed full-stack architecture

For Local Setup:
# Clone repo
git clone https://github.com/yourusername/safeyatra.git

# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm start

# ML Service
cd ML
pip install -r requirements.txt
uvicorn main:app --reload


Future Improvements:
1. Real-time crime data integration
2. Performance optimization for large maps
3. Mobile responsive improvements
4. Caching route graphs
