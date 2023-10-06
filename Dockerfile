FROM python:3.10

WORKDIR /app

COPY requirements.txt .
ENV PYTHONPATH ./app
RUN pip3 install -r requirements.txt
ENV PYTHONPATH "${PYTHONPATH}:/app"
COPY . .

CMD [ "python", "/app/bot/dispatcher.py" ]
