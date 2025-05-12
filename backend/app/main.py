from fastapi import FastAPI

app = FastAPI(title="Margin Calc API")


@app.get("/")
async def read_root():
    return {"message": "Welcome to the Margin Calc API"} 