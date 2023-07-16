import json
from typing import Dict, Union

from flask import Response
from paho.mqtt.client import Client, MQTTMessage

from app import app, db, mqtt_logger, mqtt_reciever
from app.models.Passing import Passing


@mqtt_reciever.on_connect()
def handle_connect(
    client: Client, userdata: None, flags: Dict[str, Union[str, int]], rc: int
):
    """
    Handles the connection to the MQTT broker.

    Args:
        client (paho.mqtt.client.Client): The MQTT client instance.
        userdata (None): The user data.
        flags (Dict[str, Union[str, int]]): The flags associated with the connection.
        rc (int): The result code of the connection.

    Returns:
        None
    """
    if rc != 0:
        mqtt_logger.error("Failed to connect to MQTT broker")
        return Response("Failed to connect to MQTT broker", status=502)
    mqtt_logger.info("Connected to MQTT broker")
    mqtt_reciever.subscribe(app.config["MQTT_TOPIC"])
    mqtt_logger.info(f"Subscribed to topic: {app.config['MQTT_TOPIC']}")

    return


@mqtt_reciever.on_message()
def handle_message(client: Client, userdata: None, message: MQTTMessage):
    """
    Handles an incoming MQTT message and uploads entry to database.

    Args:
        client (paho.mqtt.client.Client): The MQTT client instance.
        userdata (None): The user data.
        message (MQTTMessage): The incoming message.

    Returns:
        None
    """
    data = message.payload.decode()
    data = json.loads(data)
    if "is_red_light" not in data:
        mqtt_logger.error(f"Recieved data without is_red_light key. Recieved: {data}")
        return Response("Recieved data without is_red_light key", status=400)
    if data["is_red_light"] == 1:
        is_red = True
    else:
        is_red = False
    with app.app_context():
        passing = Passing(is_red)
        db.session.add(passing)
        db.session.commit()
        mqtt_logger.info(f"Added entry to database: {repr(passing)}")
    return Response("Added entry to database", status=201)
