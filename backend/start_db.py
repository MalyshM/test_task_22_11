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
-- Drop existing tables if they exist
DROP TABLE IF EXISTS requests;
DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the requests table
CREATE TABLE requests (
    id BIGINT AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE responses (
    id BIGINT AUTO_INCREMENT,
    request_id BIGINT NOT NULL,
    response_text VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE
);
-- Insert data into the users table
INSERT INTO users (name, email, password) VALUES
    ('User1','email1', 'password1'),
    ('User2', 'email2','password2');

-- Insert data into the requests table
INSERT INTO requests (title, status, user_id) VALUES
    ('Topic1', 'Description1', 1),
    ('Topic2', 'Description2', 1),
    ('Topic3', 'Description3', 1),
    ('Topic4', 'Description4', 2),
    ('Topic5', 'Description5', 2),
    ('Topic6', 'Description6', 2);
    ''')

# Commit the changes
connection.commit()
