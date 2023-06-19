#ifndef MQTTController_h
#define MQTTController_h
#include <WiFiNINA.h>
#include <MqttClient.h>

/// @brief MQTTController třída řešící komunikaci s MQTT brokerem (serverem) pomocí MQTT protokolu (https://mqtt.org/)
class MQTTController
{
public:
    /// @brief Vytvoří objekt MQTTController s daným brokerem, portem a topicem.
    /// @param broker URL adresa serveru MQTT brokeru.
    /// @param port Port na kterém je server přístupný.
    /// @param topic Topic na který se budou posílat zprávy.
    MQTTController(String broker, uint16_t port, String topic);
    /// @brief Vytvoří objekt MQTTController s daným brokerem, portem a topicem.
    /// @param broker IP adresa serveru MQTT brokeru.
    /// @param port Port na kterém je server přístupný.
    /// @param topic Topic na který se budou posílat zprávy.
    MQTTController(IPAddress broker, uint16_t port, String topic);
    /// @brief Připojí se k MQTT brokeru.
    /// @return true pokud se podařilo připojit, jinak false.
    bool connect();
    /// @brief Pošle zprávu na topic.
    /// @param msg Zpráva která se má poslat.
    void send(String msg);
    /// @brief Kontroluje zda je připojen k MQTT brokeru.
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