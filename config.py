import ssl


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
    # MQTT_TOPIC = "bp/arduino/proximity_sensor"
    MQTT_TOPIC = "test"


class DatabaseConfig:
    ...
