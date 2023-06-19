import logging
import logging.config

from flask import Flask
from flask_cors import CORS
from flask_mqtt import Mqtt

from .models.Passing import db

# creating the flask app
app = Flask(__name__, instance_relative_config=True)

# loading configuraiton
app.config.from_object("config.ServerConfig")
app.config.from_object("config.DatabaseConfig")
app.config.from_object("config.MQTTConfig")

# enabling logging
logging.config.dictConfig(app.config["LOGGING_CONFIG"])
app.logger.info("Logging initialized")

mqtt_logger = logging.getLogger("mqtt")
api_logger = logging.getLogger("api")

# enabling database
db.init_app(app)
app.logger.info("Database initialized")

# enable MQTT
mqtt_reciever = Mqtt(app, mqtt_logging=True)
app.logger.info("MQTT initialized")

mqtt_logger.info("MQTT initialized")
api_logger.info("API initialized")


# enabling CORS
CORS(app, resources={"/*": app.config["CORS_CONFIG"]})
app.logger.info("CORS initialized")

# importing API views
from app.endpoints import arduino, frondend, root

app.logger.info("API views imported")
