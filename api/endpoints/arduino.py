from typing import Any, Dict

from flask import Response, jsonify, request

from api import app, mqtt_reciever, topic


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
def handle_connect(client, userdata, flags, rc):
    print(123)
    mqtt_reciever.subscribe(topic)


@mqtt_reciever.on_message()
def handle_message(client, userdata, message):
    print(456)
    data = dict(topic=message.topic, payload=message.payload.decode())
    print(data)