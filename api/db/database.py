from sqlmodel import SQLModel, Field, create_engine, Session, Relationship
from dotenv import load_dotenv
import os

load_dotenv()

conn_str = os.getenv('DB')
print(conn_str)
engine = create_engine(conn_str)

def get_db():
    session = Session(engine)
    try:
        yield session
    finally:
        session.close()

class Users(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_mail: str = Field(unique=True)
    hashed_password: str
    todos: list["Todos"] = Relationship(back_populates="user")

class Todos(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user: Users = Relationship(back_populates='todos')
    description: str
    user_mail: str | None = Field(default=None,foreign_key='users.user_mail')
    completed: bool