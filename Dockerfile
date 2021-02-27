FROM python:3.8

ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH=/usr/src/app

RUN pip install --upgrade pip

WORKDIR /usr/src/app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ./entrypoint.sh