FROM python:3.9.16-slim-buster

COPY . /rifaem2webapp

WORKDIR /rifaem2webapp

RUN pip install -r requirements.txt

CMD gunicorn --workers=3 --reload --bind 0.0.0.0:5000 "wsgi:app"