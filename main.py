from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
api_cors_config = {
    "origins": ["*"],
    "methods": ["GET", "POST"],
    "allow_headers": ["Authorization", "Content-Type", "Access-Control-Allow-Origin"],
}
CORS(app, resources={"/*": api_cors_config})


@app.route("/", methods=["GET"])
def hello():
    res = {"data": "Hello World!"}
    return jsonify(res)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
