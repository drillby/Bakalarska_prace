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
    return Response("I am a teapot!", status=418)


@app.errorhandler(404)
def page_not_found(e: str) -> Response:
    """
    Returns a JSON response indicating that the requested page was not found.

    Returns:
        Response: A JSON response with the message "page not found".
    """
    api_logger.error(f"Page not found: {e}")
    return Response("I am a teapot!", status=404)


@app.errorhandler(500)
def internal_server_error(e: str) -> Response:
    """
    Returns a JSON response indicating that the server encountered an internal error.

    Returns:
        Response: A JSON response with the message "internal server error".
    """
    api_logger.error(f"Internal server error: {e}")
    return Response("Internal Server Error!", status=500)


@app.errorhandler(501)
def not_implemented(e: str) -> Response:
    """
    Returns a JSON response indicating that the requested endpoint is not implemented.

    Returns:
        Response: A JSON response with the message "not implemented".
    """
    api_logger.error(f"Not implemented: {e}")
    return Response("Not implemented!", status=501)


@app.errorhandler(502)
def bad_gateway(e: str) -> Response:
    """
    Returns a JSON response indicating that the server received an invalid response from the upstream server.

    Returns:
        Response: A JSON response with the message "bad gateway".
    """
    api_logger.error(f"Bad gateway: {e}")
    return Response("Bad gateway!", status=502)


@app.errorhandler(503)
def service_unavailable(e: str) -> Response:
    """
    Returns a JSON response indicating that the server is currently unavailable.

    Returns:
        Response: A JSON response with the message "service unavailable".
    """
    api_logger.error(f"Service unavailable: {e}")
    return Response("Service unavailable!", status=503)


@app.errorhandler(504)
def gateway_timeout(e: str) -> Response:
    """
    Returns a JSON response indicating that the server did not receive a timely response from the upstream server.

    Returns:
        Response: A JSON response with the message "gateway timeout".
    """
    api_logger.error(f"Gateway timeout: {e}")
    return Response("Gateway timeout!", status=504)


@app.errorhandler(505)
def http_version_not_supported(e: str) -> Response:
    """
    Returns a JSON response indicating that the server does not support the HTTP protocol version used in the request.

    Returns:
        Response: A JSON response with the message "http version not supported".
    """
    api_logger.error(f"HTTP version not supported: {e}")
    return Response("HTTP version not supported!", status=505)