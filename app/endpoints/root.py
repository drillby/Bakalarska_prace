from flask import jsonify

from app import api_logger, app


@app.route("/")
def run_test():
    api_logger.info("API is running")
    return jsonify(
        {
            "server": "running",
        }
    )
