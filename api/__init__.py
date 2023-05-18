from flask import Flask
from flask_cors import CORS

# creating the flask app
app = Flask(__name__, instance_relative_config=True)


# loading configuraiton
app.config.from_object("config.Config")

# enabling CORS
API_CORS_CONFIG = {
    "origins": ["*"],
    "methods": ["GET", "POST", "DELETE"],
    "allow_headers": [
        "Authorization",
        "Content-Type",
        "Access-Control-Allow-Origin",
    ],
}
CORS(app, resources={"/*": API_CORS_CONFIG})

# importing API views
from api.endpoints import arduino
