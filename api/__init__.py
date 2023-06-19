import logging
import logging.handlers

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
app.config.from_object("config.LoggingConfig")

papertrail_handler = logging.handlers.SysLogHandler(
    address=(app.config["PAPERTRAIL_HOST"], app.config["PAPERTRAIL_PORT"])
)
# add formater for mqtt logging and rest api logging
# format time : level : module : function : line number : level : message
# format time like dd/mm/yyyy hh:mm:ss
formatter = logging.Formatter(
    "%(asctime)s : %(levelname)s : %(module)s : %(funcName)s : %(lineno)d : %(message)s",
    datefmt="%d/%m/%Y %H:%M:%S",
)

papertrail_handler.setFormatter(formatter)
app.logger.setLevel(logging.INFO)
app.logger.addHandler(papertrail_handler)

papertrail_handler.setFormatter(formatter)
app.logger.addHandler(papertrail_handler)
app.logger.setLevel(logging.DEBUG)

app.logger.info("Starting app")


# enabling database
db.init_app(app)

# enable MQTT
mqtt_reciever = Mqtt(app, mqtt_logging=True)


# enabling CORS

CORS(app, resources={"/*": app.config["CORS_CONFIG"]})

# importing API views
from api.endpoints import arduino, frondend, root
