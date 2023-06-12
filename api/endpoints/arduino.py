from typing import Any, Dict

from flask import Response, jsonify, request

from api import app, sockets


@app.route("/")
def run_test():
    return jsonify(
        {
            "server": "running",
        }
    )


@app.route("/write_db", methods=["POST"])
def write_to_db():
    print(request.json)
    return jsonify({"status": "OK"})

@sockets.route("/test")
def handle_message(ws):
    print(ws)
    while True:
        msg = ws.receive()
        print(msg)


# @socketio.on("connect", namespace="/test")
# def handle_connection(_: Any):
#     print("test")
#     return Response("Switching protocols", 101)


# @socketio.on("message", namespace="/test")
# def handle_message(message: Dict[str, Any]):
#     print(message)
