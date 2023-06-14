from flask import Flask
from flask_cors import CORS
from flask_mqtt import Mqtt

# creating the flask app
app = Flask(__name__, instance_relative_config=True)

# loading configuraiton
app.config.from_object("config.ServerConfig")
app.config.from_object("config.DatabaseConfig")
app.config.from_object("config.MQTTConfig")

# enable MQTT
mqtt_reciever = Mqtt(app, mqtt_logging=True)


# enabling CORS

CORS(app, resources={"/*": app.config["CORS_CONFIG"]})

# importing API views
from api.endpoints import arduino
