#include "Arduino.h"
#include "libs/APIController.h"
#include <WiFi.h>

APIController::APIController(String server_address, uint16_t server_port)
{
    url = server_address;
    port = server_port;
    WiFiClient client;
    is_connected = false;
}

APIController::APIController(IPAddress ip_address, uint16_t server_port)
{
    ip = ip_address;
    port = server_port;
    WiFiClient client;
    is_connected = false;
}

void APIController::connect(uint8_t num_of_tries)
{
    for (uint8_t i = 0; i <= num_of_tries; i++)
    {
        if (client.connect(ip, port))
        {
            is_connected = true;
            break;
        }
        delay(10000);
    }
}

void APIController::sendRequest(uint8_t req_type, String endpoint, bool keep_alive)
{
    if (req_type == 1)
    {
        _getRequest(endpoint, keep_alive);
    }
    else if (req_type == 2)
    {
        _postRequest(endpoint, keep_alive);
    }
}

void APIController::_getRequest(String endpoint, bool keep_alive)
{
    client.println("GET " + String(endpoint) + " HTTP/1.1");
    client.println("Host: " + String(url));
    client.println("Accept: application/json");
    if (keep_alive)
    {
        client.println("Connection: keep-alive");
    }
    else
    {
        client.println("Connection: close");
    }
    client.println();
}

void APIController::_postRequest(String endpoint, bool keep_alive)
{
}

char APIController::_readRespose()
{
    while (!client.available())
    {
        ;
    }
    return client.read();
}