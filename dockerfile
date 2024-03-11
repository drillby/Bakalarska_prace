# create dockerfile for this flask app

# Use the official image as a parent image
FROM python:3.10.0a7-slim-buster

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

RUN pip install -r requirements.txt

EXPOSE 5000

# Run app.py when the container launches
CMD ["python", "app.py"]
# CMD ["gunicorn", "--bind", "ip:port", "app:app"]

