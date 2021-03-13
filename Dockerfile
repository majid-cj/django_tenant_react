FROM nikolaik/python-nodejs:python3.8-nodejs14
ENV PYTHONUNBUFFERED 1
RUN mkdir /app
WORKDIR /app
ADD . /app/
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt
