import ssl

from flask import Flask
from flask_cors import CORS
from flask_mqtt import Mqtt

# creating the flask app
app = Flask(__name__, instance_relative_config=True)
app.config["SECRET"] = "secret!123"

app.config["MQTT_BROKER_URL"] = "test.mosquitto.org"
app.config["MQTT_BROKER_PORT"] = 8883
# app.config[
#     "MQTT_USERNAME"
# ] = ""  # Set this item when you need to verify username and password
# app.config[
#     "MQTT_PASSWORD"
# ] = ""  # Set this item when you need to verify username and password
app.config["MQTT_KEEPALIVE"] = 5  # Set KeepAlive time in seconds
app.config["MQTT_TLS_ENABLED"] = True  # If your server supports TLS, set it True
app.config["MQTT_TLS_CA_CERTS"] = "./cert/mosquitto.org.pem"
app.config["MQTT_TLS_CERTFILE"] = "./cert/certificate.pem"
app.config["MQTT_TLS_KEYFILE"] = "./cert/private.key"
app.config["MQTT_TLS_CIPHERS"] = "ECDHE-RSA-AES128-GCM-SHA256"
app.config["MQTT_TLS_VERSION"] = ssl.PROTOCOL_TLSv1_2


topic = "test"

mqtt_reciever = Mqtt(app, mqtt_logging=True)

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
