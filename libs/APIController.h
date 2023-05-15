#ifndef APIController_h
#define APIController_h
#include "WiFiNINA.h"

class APIController
{
public:
    APIController(String server_url, uint16_t server_port);
    APIController(IPAddress ip_address, uint16_t server_port);
    void connect(uint8_t num_of_tries);
    void sendRequest(uint8_t req_type, String endpoint, bool keep_alive);
    IPAddress ip;
    String url = "";
    uint16_t port;
    bool is_connected;

private:
    void _getRequest(String endpoint, bool keep_alive);
    void _postRequest(String endpoint, bool keep_alive);
    char _readRespose();
    WiFiClient client;
};

enum RequestType
{
    GET_REQUEST = 1,
    POST_REQUEST = 2
};

#endif