FROM python:3.9

WORKDIR /app

EXPOSE 5050

RUN pip install flask
RUN pip install flask_cors
RUN pip install requests

COPY . ./

CMD ["python", "main.py"]