FROM nikolaik/python-nodejs:python3.8-nodejs14
ENV PYTHONUNBUFFERED 1
RUN mkdir /app
WORKDIR /app
ADD . /app/
RUN pip install -r requirements.txt
