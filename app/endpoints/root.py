from flask import Response, jsonify

from app import api_logger, app


@app.route("/")
def run_test() -> Response:
    """
    Returns a JSON response indicating that the server is running.

    Returns:
        Response: A JSON response with the message "server: running".
    """
    api_logger.info("API is running")
    return jsonify(
        {
            "server": "running",
        }
    )
