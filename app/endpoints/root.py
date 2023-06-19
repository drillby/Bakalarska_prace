from flask import jsonify

from app import app


@app.route("/")
def run_test():
    return jsonify(
        {
            "server": "running",
        }
    )
