import ast
import asyncio
import datetime
import json
import time
from fastapi import APIRouter, Query, Depends
from starlette import status

# from models import connect_db, Lesson, Team
from models import connect_db, User, Login, Request, Respond

router = APIRouter()


@router.get('/api/requests', name='Team:get_all_teams', status_code=status.HTTP_200_OK,
            tags=["Team"], description=
            """
                    Получает все команды

                    Returns:
                        List[Team]: список всех команд.
            """)
async def get_all_requests(db=Depends(connect_db)):
    # Execute SQL query to select all requests
    query = "SELECT * FROM requests"
    with db.cursor() as cursor:
        cursor.execute('USE test')
        cursor.execute(query)
        result = cursor.fetchall()

    # Process the result and return the response
    response_list = []
    for row in result:
        response_list.append(row)
    return response_list

@router.post('/api/create_request', name='Team:get_all_teams', status_code=status.HTTP_200_OK,
            tags=["Team"], description=
            """
                    Получает все команды

                    Returns:
                        List[Team]: список всех команд.
            """)
async def create_request(request: Request,db=Depends(connect_db)):
    print(request)
    # Execute SQL query to select all requests
    query = "INSERT INTO requests (title, status, user_id) VALUES (%s, %s, %s)"
    with db.cursor() as cursor:
        cursor.execute('USE test')
        values = (request.title, request.status, request.user_id)
        cursor.execute(query, values)
    print('susses')
    db.commit()
    return {"message": "request added"}

@router.post('/api/create_respond', name='Team:get_all_teams', status_code=status.HTTP_200_OK,
            tags=["Team"], description=
            """
                    Получает все команды

                    Returns:
                        List[Team]: список всех команд.
            """)
async def create_respond(respond: Respond,db=Depends(connect_db)):
    print(respond)
    # Execute SQL query to select all requests
    query = "INSERT INTO responses (request_id, response_text, user_id) VALUES (%s, %s, %s)"
    with db.cursor() as cursor:
        cursor.execute('USE test')
        values = (respond.request_id, respond.response_text, respond.user_id)
        cursor.execute(query, values)
    print('susses')
    db.commit()
    return {"message": "request added"}

@router.get('/api/my_inbox', name='Team:get_all_teams', status_code=status.HTTP_200_OK,
            tags=["Team"], description=
            """
                    Получает все команды

                    Returns:
                        List[Team]: список всех команд.
            """)
async def my_inbox(user: int,db=Depends(connect_db)):
    # Execute SQL query to select all requests
    query = "SELECT * FROM responses WHERE request_id in (SELECT id FROM requests WHERE user_id = %s) and user_id <> %s"
    with db.cursor() as cursor:
        cursor.execute('USE test')
        values = (user, user)
        cursor.execute(query, values)
        result = cursor.fetchall()

    response_list = []
    for row in result:
        response_list.append(row)
    return response_list

@router.get('/api/requests/{id}', name='Team:get_all_teams', status_code=status.HTTP_200_OK,
            tags=["Team"], description=
            """
                    Получает все команды

                    Returns:
                        List[Team]: список всех команд.
            """)
async def get_detailed_request(id: int, db=Depends(connect_db)):
    # Execute SQL query to select the specific request by id
    query = "SELECT * FROM requests WHERE id = %s"
    with db.cursor() as cursor:
        cursor.execute('USE test')
        cursor.execute(query, id)
        result = cursor.fetchone()

    # Process the result and return the response
    if result:
        return result
    else:
        return {"message": "Request not found"}


@router.post('/api/register', name='Team:get_all_teams', status_code=status.HTTP_200_OK,
             tags=["Team"], description=
             """
                     Получает все команды
 
                     Returns:
                         List[Team]: список всех команд.
             """)
async def register(user: User, db=Depends(connect_db)):
    # Execute SQL query to select the specific request by id
    query = "SELECT * FROM requests WHERE id = %s"
    query = "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)"
    # try:
    with db.cursor() as cursor:
        cursor.execute('USE test')
        values = (user.username, user.email, user.password)
        cursor.execute(query, values)
    print('susses')
    db.commit()
    return {"message": "user added"}
    # except:
    #     print("error")
    #     return {"message": "error"}


@router.post('/api/login', name='Team:get_all_teams', status_code=status.HTTP_200_OK,
             tags=["Team"], description=
             """
                     Получает все команды

                     Returns:
                         List[Team]: список всех команд.
             """)
async def login(login: Login, db=Depends(connect_db)):
    # Execute SQL query to select the specific request by id
    query = "SELECT * FROM users WHERE name = %s and password = %s"
    # query = "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)"
    # try:
    with db.cursor() as cursor:
        cursor.execute('USE test')
        values = (login.username, login.password)
        cursor.execute(query, values)
        result = cursor.fetchone()
    print('susses')
    # db.commit()
    return result['id']
    # except:
    #     print("error")
    #     return {"message": "error"}