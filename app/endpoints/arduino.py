import json
from typing import Dict, Union

from paho.mqtt.client import Client, MQTTMessage

from app import app, db, mqtt_logger, mqtt_reciever
from app.models.Passing import Passing


@mqtt_reciever.on_connect()
def handle_connect(
    client: Client, userdata: None, flags: Dict[str, Union[str, int]], rc: int
):
    if rc != 0:
        mqtt_logger.error("Failed to connect to MQTT broker")
        return
    mqtt_logger.info("Connected to MQTT broker")
    mqtt_reciever.subscribe(app.config["MQTT_TOPIC"])


@mqtt_reciever.on_message()
def handle_message(client: Client, userdata: None, message: MQTTMessage):
    data = message.payload.decode()
    data = json.loads(data)
    if "is_red_light" not in data:
        mqtt_logger.fatal(f"Recieved data without is_red_light key. Recieved: {data}")
        return
    if data["is_red_light"] == 1:
        is_red = True
    else:
        is_red = False
    with app.app_context():
        passing = Passing(is_red)
        db.session.add(passing)
        db.session.commit()
        mqtt_logger.info(f"Added entry to database: {repr(passing)}")
    return
