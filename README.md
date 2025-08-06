Run front end

cd frontend
you may want to remove package-lock.json
npm install
docker compose up --build


Run backend

pip install -r requirements.txt
uvicorn app.main:app --reload
