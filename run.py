from api import app

if __name__ == "__main__":
    # app.run(debug=True, host="192.168.132.103", port=8000)
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler
    server = pywsgi.WSGIServer(('192.168.132.103', 8000), app, handler_class=WebSocketHandler)
    server.serve_forever()
    print("serving")