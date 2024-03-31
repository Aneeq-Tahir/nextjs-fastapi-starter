from fastapi import FastAPI, Body, HTTPException, Depends
from api.auth import router, get_current_user
from api.db.database import engine, get_db, Session, Todos, SQLModel
from sqlmodel import select
from starlette import status
from pydantic import BaseModel

app = FastAPI(docs_url='/api/docs', openapi_url='/api/openapi.json')
app.include_router(router)

SQLModel.metadata.create_all(bind=engine)

# class UpdateTodoRequest(BaseModel):
#     completed: bool
#     description: str

@app.post('/api/todo')
async def create_todo(todo: Todos, db: Session = Depends(get_db), user = Depends(get_current_user)):
    try:
        new_todo = Todos(description=todo.description, user_mail=user["user_mail"], completed=False)
        db.add(new_todo)
        db.commit()
        db.refresh(new_todo)
        return {"message": "Todo added successfully"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail= {"error_msg": str(e)})

@app.get("/api/todo")
async def get_user_todos(db: Session = Depends(get_db), user = Depends(get_current_user)):
    try:
        user_todos = db.exec(select(Todos).where(Todos.user_mail == user["user_mail"])).all()
        if user_todos:
            return {"todos": user_todos}
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Todo not Found!')
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail= {"error_msg": str(e)})

@app.put('/api/todo/{todo_id}')
async def update_todo(todo_id: int, todo: Todos, db: Session = Depends(get_db), user = Depends(get_current_user)):
    try:
        new_todo = db.exec(select(Todos).where(Todos.id == todo_id)).first()
        if new_todo:
            new_todo.completed = todo.completed
            db.commit()
            db.refresh(new_todo)
            return {"message": "Todo updated successfully"}
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Todo not Found!')
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail= {"error_msg": str(e)})

@app.delete('/api/todo/{todo_id}')
async def delete_todo(todo_id: int, db: Session = Depends(get_db), user = Depends(get_current_user)):
    try:
        new_todo = db.exec(select(Todos).where(Todos.id == todo_id)).first()
        if new_todo:
            db.delete(new_todo)
            db.commit()
            return {"message": "Todo deleted successfully"}
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Todo not Found!')
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"error_msg": str(e)})