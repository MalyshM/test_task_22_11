import pymysql
from pymysql.cursors import DictCursor
from pymysql.constants import CLIENT

# Connect to the MySQL Server
connection = pymysql.connect(
    host='localhost',
    user='root',
    password='admin',
    charset='utf8mb4',
    cursorclass=DictCursor,
    client_flag=CLIENT.MULTI_STATEMENTS
)

# Delete the database if it exists
with connection.cursor() as cursor:
    cursor.execute('DROP DATABASE IF EXISTS test')

    # Create the database
    cursor.execute('CREATE DATABASE test')

    # Switch to the newly created database
    cursor.execute('USE test')

    # Delete tables if they exist

    # Create tables or define schema using SQL statements
    cursor.execute('''
DROP TABLE IF EXISTS requests;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE requests (
    id BIGINT AUTO_INCREMENT,
    topic VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
    ''')

# Commit the changes
connection.commit()
