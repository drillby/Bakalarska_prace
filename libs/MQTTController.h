#ifndef MQTTController_h
#define MQTTController_h
#include <WiFiNINA.h>
#include <MqttClient.h>

class MQTTController
{
public:
    MQTTController(String broker, uint16_t port, String topic);
    MQTTController(IPAddress broker, uint16_t port, String topic);
    bool connect();
    void send(String msg);
    void poll();

    String broker_url = "";
    IPAddress broker_ip;
    uint16_t broker_port;
    String topic;

private:
    WiFiClient _wifi;
    MqttClient _mqtt = MqttClient(_wifi);
};

#endif