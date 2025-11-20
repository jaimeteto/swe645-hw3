============================================================ 
SURVEY APP DEVELOPMENT GUIDE
============================================================

This guide explains how the Survey App was developed, including the
frontend, backend, database, and how to run or test all parts
together—both locally and in Kubernetes (Rancher on AWS).

============================================================ 
1. PROJECT OVERVIEW 
============================================================
The Survey App consists of three main components:

1.  FRONTEND – React application where users fill out the survey.
2.  BACKEND – FastAPI service that receives survey submissions.
3.  DATABASE – SQLite database where surveys are stored.

The app is deployed using: - Docker images for both frontend and
backend. - Kubernetes cluster (Rancher / RKE2 on AWS EC2). - Services
that expose each component inside the cluster. All of these were done using a similar jenkins pipeline
that was used on hw2 

============================================================ 
2. FRONTEND DEVELOPMENT 
============================================================

TECHNOLOGIES: - React (JavaScript) - Fetch/Axios for calling
backend API - Docker for containerization

WHAT THE FRONTEND DOES: - Displays full survey form with: Name, address,
contact info, date, preferences, likelihood, etc. - Builds a JSON
request matching the backend schema. - Sends POST requests to the
backend endpoint: POST /api/surveys

LOCAL DEVELOPMENT (FRONTEND): 
	cd frontend 
	npm install 
	npm run dev

Typical local URL: http://localhost:3000


============================================================ 
3. BACKEND DEVELOPMENT 
============================================================

TECHNOLOGIES: - FastAPI - Pydantic validation - SQLite (via SQLAlchemy) - Docker

BACKEND FEATURES: 
	- POST /api/surveys – save survey entry 
	- GET /api/surveys – list all surveys - Validates all incoming data using Pydantic models.

LOCAL DEVELOPMENT (BACKEND): 
	cd backend 
	python -m venv venv source
	venv/bin/activate 
	(Windows: venv) pip install -r requirements.txt

RUN LOCALLY: uvicorn main:app --reload

LOCAL BACKEND URL: http://localhost:8000 Docs at:
	http://localhost:8000/docs



============================================================ 
4. DATABASE (SQLITE) 
============================================================
DATABASE ENGINE: - SQLite used for persistence in the backend container.

STRUCTURE: - File-based database named survey.db - Automatically created
when backend starts.

WHERE DATA IS STORED: - survey.db inside backend container - Each survey
submitted becomes a row in the DB.

============================================================ 
5. RUNNING
THE ENTIRE SYSTEM LOCALLY
============================================================

The code submitted was changed back so that it could be tested locally 

1.  Start backend: 
	cd backend 
	uvicorn main:app --reload

2.  Start frontend: 
	cd frontend 
	npm run dev

3.  Open the frontend: http://localhost:3000

4.  Submit a survey through the form.

5.  View stored data: http://localhost:8000/docs GET /api/surveys

============================================================ 6.
KUBERNETES / RANCHER DEPLOYMENT
============================================================

DEPLOYED COMPONENTS (NAMESPACE: hw3): - survey-frontend-deployment -
survey-frontend-svc - survey-backend-deployment - survey-backend-svc

The frontend calls the backend using:
https://34.193.170.16/api/v1/namespaces/hw3/services/http:survey-backend-svc:8000/proxy


============================================================ 7.
ACCESSING THE FRONTEND
============================================================

CURRENT METHOD (Rancher Proxy URL):
https://34.193.170.16/api/v1/namespaces/hw3/services/http:survey-frontend-svc:80/proxy/

IMPORTANT: - This only works when logged into Rancher.

Log in to rancher at https://34.193.170.16 and then use
	usrname:admin
	password:Kairipinky12!

PUBLIC METHOD (recommended): Change frontend service to: type:
LoadBalancer

AWS will create an external ELB URL usable on any device.

