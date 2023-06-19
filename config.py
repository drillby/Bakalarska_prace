import ssl


class ServerConfig:
    IP_ADDRESS = "192.168.132.103"
    TESTING = True
    PORT = 8000
    DEBUG = True
    RELOADER = False
    CORS_CONFIG = {
        "origins": ["*"],
        "methods": ["GET", "POST", "DELETE"],
        "allow_headers": [
            "Authorization",
            "Content-Type",
            "Access-Control-Allow-Origin",
        ],
    }


class MQTTConfig:
    MQTT_BROKER_URL = "test.mosquitto.org"
    MQTT_BROKER_PORT = 8883
    MQTT_KEEPALIVE = 5  # Set KeepAlive time in seconds
    MQTT_TLS_ENABLED = True  # If your server supports TLS, set it True
    MQTT_TLS_CA_CERTS = "./cert/mosquitto.org.pem"
    MQTT_TLS_CERTFILE = "./cert/certificate.pem"
    MQTT_TLS_KEYFILE = "./cert/private.key"
    MQTT_TLS_CIPHERS = "ECDHE-RSA-AES128-GCM-SHA256"
    MQTT_TLS_VERSION = ssl.PROTOCOL_TLSv1_2
    MQTT_TOPIC = "bp/arduino/proximity_sensor"


class DatabaseConfig:
    DB_TYPE = "mysql+pymysql"
    DB_HOST = "192.168.132.156"
    DB_PORT = 3306
    DB_USER = "drillby"
    DB_PW = "password"
    DB_NAME = "Development"
    DB_TABLE = "CarPassing"
    SQLALCHEMY_DATABASE_URI = (
        f"{DB_TYPE}://{DB_USER}:{DB_PW}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )
