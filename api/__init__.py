from flask import Flask
from flask_cors import CORS
from flask_mqtt import Mqtt

from .models.Passing import Passing, db

# creating the flask app
app = Flask(__name__, instance_relative_config=True)

# loading configuraiton
app.config.from_object("config.ServerConfig")
app.config.from_object("config.DatabaseConfig")
app.config.from_object("config.MQTTConfig")

# enabling database
db.init_app(app)

# enable MQTT
mqtt_reciever = Mqtt(app, mqtt_logging=True)


# enabling CORS

CORS(app, resources={"/*": app.config["CORS_CONFIG"]})

# importing API views
from api.endpoints import arduino, frondend, root
