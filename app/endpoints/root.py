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


@app.route("/teapot")
def teapot() -> Response:
    response = jsonify(
        {
            "message": "I am a teapot!",
        }
    )
    response.status_code = 418
    return response


@app.errorhandler(404)
def page_not_found(e: str) -> Response:
    """
    Returns a JSON response indicating that the requested page was not found.

    Returns:
        Response: A JSON response with the message "page not found".
    """
    api_logger.error(f"Page not found: {e}")
    response = jsonify(
        {
            "message": "Page not found!",
        }
    )
    response.status_code = 404
    return response


@app.errorhandler(500)
def internal_server_error(e: str) -> Response:
    """
    Returns a JSON response indicating that the server encountered an internal error.

    Returns:
        Response: A JSON response with the message "internal server error".
    """
    api_logger.error(f"Internal server error: {e}")
    response = jsonify(
        {
            "message": "Internal server error!",
        }
    )
    response.status_code = 500
    return response


@app.errorhandler(501)
def not_implemented(e: str) -> Response:
    """
    Returns a JSON response indicating that the requested endpoint is not implemented.

    Returns:
        Response: A JSON response with the message "not implemented".
    """
    api_logger.error(f"Not implemented: {e}")
    response = jsonify(
        {
            "message": "Not implemented!",
        }
    )
    response.status_code = 501
    return response


@app.errorhandler(502)
def bad_gateway(e: str) -> Response:
    """
    Returns a JSON response indicating that the server received an invalid response from the upstream server.

    Returns:
        Response: A JSON response with the message "bad gateway".
    """
    api_logger.error(f"Bad gateway: {e}")
    response = jsonify(
        {
            "message": "Bad gateway!",
        }
    )
    response.status_code = 502
    return response


@app.errorhandler(503)
def service_unavailable(e: str) -> Response:
    """
    Returns a JSON response indicating that the server is currently unavailable.

    Returns:
        Response: A JSON response with the message "service unavailable".
    """
    api_logger.error(f"Service unavailable: {e}")
    response = jsonify(
        {
            "message": "Service unavailable!",
        }
    )
    response.status_code = 503
    return response


@app.errorhandler(504)
def gateway_timeout(e: str) -> Response:
    """
    Returns a JSON response indicating that the server did not receive a timely response from the upstream server.

    Returns:
        Response: A JSON response with the message "gateway timeout".
    """
    api_logger.error(f"Gateway timeout: {e}")
    response = jsonify(
        {
            "message": "Gateway timeout!",
        }
    )
    response.status_code = 504
    return response


@app.errorhandler(505)
def http_version_not_supported(e: str) -> Response:
    """
    Returns a JSON response indicating that the server does not support the HTTP protocol version used in the request.

    Returns:
        Response: A JSON response with the message "http version not supported".
    """
    api_logger.error(f"HTTP version not supported: {e}")
    response = jsonify(
        {
            "message": "HTTP version not supported!",
        }
    )
    response.status_code = 505
    return response
