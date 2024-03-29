from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from api.db.database import get_db, Users, Session, SQLModel
from sqlmodel import select
from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta
from pydantic import BaseModel
from starlette import status
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter(prefix='/api/auth')

SECRET_KEY = os.getenv('JWT_SECRET_KEY')
ALGORITHM = os.getenv('JWT_ALGORITHM')

bcrypt_context = CryptContext(schemes=['bcrypt'])
oauth2_bearer = OAuth2PasswordBearer(tokenUrl='/api/auth/token')

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post('/signup', status_code=status.HTTP_201_CREATED)
async def create_user(user: Users, db: Session= Depends(get_db)):
    try:
        new_user = Users(
            user_mail=user.user_mail, 
            hashed_password=bcrypt_context.hash(secret=user.hashed_password)
        )
        db.add(new_user)
        db.commit()
        return {"message": "User created successfully"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"error": str(e)})
    
@router.post('/token', response_model=Token)
async def login_for_access_token(formdata: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    try:
        user = authenticate_user(formdata.username, formdata.password, db)
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail={"message": "incorrect username or password"})
        token = generate_access_token(user.user_mail, user.id, timedelta(minutes=20))
        return {"access_token": token, "token_type": "bearer"}
    except Exception as e:
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

async def get_current_user(token: str = Depends(oauth2_bearer)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_mail: str = payload.get('sub')
        user_id: int = payload.get('id')
        if not user_mail or not user_id:
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, 'incorrect username or password')
        return {"user_mail": user_mail, "id": user_id} 
    except JWTError:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, 'error validating user')

def authenticate_user(user_mail: str, password: str, db: Session):
    user = db.exec(select(Users).where(Users.user_mail == user_mail)).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.hashed_password):
        return False
    return user

def generate_access_token(user_mail: str, user_id: int, expires_delta: timedelta):
    expires = datetime.now() + expires_delta
    encode = {'sub': user_mail, 'id': user_id, "exp": expires}
    return jwt.encode(encode, SECRET_KEY, ALGORITHM)