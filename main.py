from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/", methods=["GET"])
def hello():
    res = {"data": "Hello World!"}
    return jsonify(res)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
