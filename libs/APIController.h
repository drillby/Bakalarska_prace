#ifndef APIController_h
#define APIController_h

class APIController
{
public:
    APIController(String url, uint8_t port);
    void connect(uint8_t num_of_tries);
    void sendRequest(uint8_t req_type, String endpoint);
};

enum RequestType
{
    GET_REQUEST = 1,
    POST_REQUEST = 2
};

#endif