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

void APIController::sendRequest(uint8_t req_type, String endpoint, String body)
{
    if (req_type == 1)
    {
        _getRequest(endpoint);
    }
    else if (req_type == 2)
    {
        _postRequest(endpoint, body);
    }
}

void APIController::_getRequest(String endpoint)
{
    client.println("GET " + String(endpoint) + " HTTP/1.1");
    client.println("Host: " + String(url));
    client.println("Accept: application/json");
    client.println("Connection: close");
    client.println();
}

void APIController::_postRequest(String endpoint, String body)
{
    client.println("POST " + String(endpoint) + " HTTP/1.1");
    client.println("Host: " + String(url));
    client.println("Accept: application/json");
    client.println("Connection: close");
    client.println("Content-Type: application/json");
    client.println("Content-Length: " + String(body.length()));
    client.println(body);
    client.println();
}

String APIController::_readRespose()
{
    while (!client.available())
    {
        ;
    }
    return client.readStringUntil('\n');
}

bool APIController::isOKResCode()
{
    String res = _readRespose();
    return res.indexOf("200") != -1;
}

void APIController::disconect()
{
    is_connected = false;
    client.stop();
}