from flask import jsonify, request
from simple_websocket.ws import Server as ws_req

from api import app, socketio


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

@socketio.on("message", namespace="/test")
def handle_message(message):
    print(message)