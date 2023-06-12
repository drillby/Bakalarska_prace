from flask import Flask
from flask_cors import CORS
from flask_sock import Sock

# creating the flask app
app = Flask(__name__, instance_relative_config=True)
app.config["SECRET"] = "secret!123"

sockets = Sock(app)
app.config['SOCK_SERVER_OPTIONS'] = {'ping_interval': 25}


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
        "Sec-WebSocket-Version",
        "Sec-WebSocket-Key",
    ],
}
CORS(app, resources={"/*": API_CORS_CONFIG})

# importing API views
from api.endpoints import arduino
