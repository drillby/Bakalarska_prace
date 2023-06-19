import json
from typing import Dict, Union

from paho.mqtt.client import Client, MQTTMessage

from api import Passing, app, db, mqtt_reciever


@mqtt_reciever.on_connect()
def handle_connect(
    client: Client, userdata: None, flags: Dict[str, Union[str, int]], rc: int
):
    if rc != 0:
        print("Failed to connect, return code %d\n", rc)
        return
    print("Connected to MQTT broker")
    mqtt_reciever.subscribe(app.config["MQTT_TOPIC"])


@mqtt_reciever.on_message()
def handle_message(client: Client, userdata: None, message: MQTTMessage):
    data = message.payload.decode()
    data = json.loads(data)
    print(data)
    if data["is_red_light"] == 1:
        is_red = True
    else:
        is_red = False
    with app.app_context():
        passing = Passing(is_red)
        db.session.add(passing)
        db.session.commit()
    return
