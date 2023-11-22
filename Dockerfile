FROM python:3.10

ENV PYTHONUNBUFFERED 1

EXPOSE 8000
WORKDIR /app
RUN pip install webdriver-manager
COPY . /app
RUN pip install -e .
RUN pip install --no-cache-dir -r requirements.txt