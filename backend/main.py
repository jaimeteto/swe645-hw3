from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow the React dev server and later the K8s service to call us
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # tighten later (e.g., to your frontend host)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

# Placeholder list endpoint we’ll replace with real CRUD later
@app.get("/surveys")
def list_surveys():
    return []
