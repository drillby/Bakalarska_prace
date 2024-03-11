import ssl


class ServerConfig:
    IP_ADDRESS = "127.0.0.1"
    TESTING = False
    PORT = 5000
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
    LOGGING_CONFIG = {
        "version": 1,
        "formatters": {
            "default": {
                "format": "%(asctime)s : %(levelname)s : %(module)s : %(funcName)s : %(lineno)d : %(message)s",
                "datefmt": "%d/%m/%Y %H:%M:%S",
            },
            "mqtt": {
                "format": "%(asctime)s : %(levelname)s : %(message)s",
                "datefmt": "%d/%m/%Y %H:%M:%S",
            },
        },
        "handlers": {
            "mqtt": {
                "class": "logging.handlers.RotatingFileHandler",
                "formatter": "mqtt",
                "filename": "./logs/mqtt.log",
                "maxBytes": 1024 * 1024 * 100,
                "backupCount": 20,
            },
            "app": {
                "class": "logging.handlers.RotatingFileHandler",
                "formatter": "default",
                "filename": "./logs/app.log",
                "maxBytes": 1024 * 1024 * 100,
                "backupCount": 20,
            },
            "api": {
                "class": "logging.handlers.RotatingFileHandler",
                "formatter": "default",
                "filename": "./logs/api.log",
                "maxBytes": 1024 * 1024 * 100,
                "backupCount": 20,
            },
        },
        "loggers": {
            "mqtt": {
                "handlers": ["mqtt"],
                "level": "INFO",
                "propagate": True,
            },
            "app": {
                "handlers": ["app"],
                "level": "INFO",
                "propagate": True,
            },
            "api": {
                "handlers": ["api"],
                "level": "INFO",
                "propagate": True,
            },
        },
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
