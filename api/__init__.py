from flask import Flask
from flask_cors import CORS

# creating the flask app
app = Flask(__name__, instance_relative_config=True)


# loading configuraiton
app.config.from_object("config.Config")

# enabling CORS
api_cors_config = {
    "origins": ["*"],
    "methods": ["GET", "POST", "DELETE"],
    "allow_headers": ["Authorization", "Content-Type", "Access-Control-Allow-Origin", "Connection", "Keep-Alive"],
}
CORS(app, resources={"/api/*": api_cors_config})

# importing API views
from api.endpoints import arduino
