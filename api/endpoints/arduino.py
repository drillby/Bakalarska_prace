from flask import jsonify, request

from api import app, sock


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


@sock.route("/test")
def test_websocket(sock):
    while True:
        data = sock.receive()
        print(data)