from flask import jsonify

from api import app


@app.route("/")
def run_test():
    return jsonify(
        {
            "server": "running",
        }
    )
