from typing import Any, Dict

from flask import Response, jsonify, request

from api import app


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

