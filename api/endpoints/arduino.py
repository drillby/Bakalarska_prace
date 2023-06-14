from typing import Dict, Union

from paho.mqtt.client import Client, MQTTMessage

from api import app, mqtt_reciever


@mqtt_reciever.on_connect()
def handle_connect(
    client: Client, userdata: None, flags: Dict[str, Union[str, int]], rc: int
):
    if rc != 0:
        return
    mqtt_reciever.subscribe(app.config["MQTT_TOPIC"])


@mqtt_reciever.on_message()
def handle_message(client: Client, userdata: None, message: MQTTMessage):
    data = dict(topic=message.topic, payload=message.payload.decode())
    print(data)
