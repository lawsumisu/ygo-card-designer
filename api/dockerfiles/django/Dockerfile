FROM python:3
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip

RUN apt-get update -qq && apt-get install -qqy postgresql-client
 
COPY ./requirements.txt .
RUN pip install -r requirements.txt 

WORKDIR /app