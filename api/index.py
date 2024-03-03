from fastapi import FastAPI

app = FastAPI()

@app.get("/python")
def hello_world():
    return {"message": "Hello World"}