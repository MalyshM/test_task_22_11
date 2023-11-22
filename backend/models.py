import pymysql
from pymysql.constants import CLIENT
from pymysql.cursors import DictCursor
from pydantic import BaseModel

def connect_db():
    connection = pymysql.connect(
        host='db',
        user='root',
        password='admin',
        charset='utf8mb4',
        cursorclass=DictCursor,
        client_flag=CLIENT.MULTI_STATEMENTS
    )
    return connection



class User(BaseModel):
    username: str
    email: str
    password: str

class Login(BaseModel):
    username: str
    password: str

class Request(BaseModel):
    title: str
    status: str
    user_id: int

class Respond(BaseModel):
    request_id: int
    response_text: str
    user_id: int