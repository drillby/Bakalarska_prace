from typing import Any, Dict

from flask import Response, jsonify, request
from paho.mqtt.client import Client, MQTTMessage

from api import app, mqtt_reciever


@app.route("/")
def run_test():
    return jsonify(
        {
            "server": "running",
        }
    )


@app.route("/write_db", methods=["POST"])
def write_to_db():
    print(request.json)
    return jsonify({"status": "OK"})


@mqtt_reciever.on_connect()
def handle_connect(client:Client, userdata, flags, rc):
    if rc != 0:
        return
    mqtt_reciever.subscribe(app.config["MQTT_TOPIC"])


@mqtt_reciever.on_message()
def handle_message(client: Client, userdata, message: MQTTMessage):
    data = dict(topic=message.topic, payload=message.payload.decode())
    print(data)
