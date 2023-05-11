#ifndef APIController_h
#define APIController_h
#include "WiFiNINA.h"

class APIController
{
public:
    APIController(String server_url, uint8_t server_port);
    void connect(uint8_t num_of_tries);
    void sendRequest(uint8_t req_type, String endpoint, bool keep_alive);
    String url;
    uint8_t port;

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