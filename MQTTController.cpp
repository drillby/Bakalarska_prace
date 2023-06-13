#include "libs/MQTTController.h"

MQTTController::MQTTController(String broker, uint16_t port, String sub_topic)
{
    broker_url = broker;
    broker_port = port;
    topic = sub_topic;
}

MQTTController::MQTTController(IPAddress broker, uint16_t port, String sub_topic)
{
    broker_ip = broker;
    broker_port = port;
    topic = sub_topic;
}

bool MQTTController::connect()
{
    _mqtt.connect(broker_url.c_str(), broker_port);
}

bool MQTTController::connect()
{
    _mqtt.connect(broker_ip, broker_port);
}

void MQTTController::poll()
{
    _mqtt.poll();
}

void MQTTController::send(String msg)
{
    _mqtt.beginMessage(topic);
    _mqtt.print(msg);
    _mqtt.endMessage();
}