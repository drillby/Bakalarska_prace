import socket

from api import app


def get_local_ip() -> str:
    try:
        # Create a socket object
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

        # Connect to a dummy address
        sock.connect(("8.8.8.8", 80))

        # Retrieve the local IP address
        local_ip = sock.getsockname()[0]

        # Close the socket
        sock.close()

        return local_ip
    except socket.error:
        return None


if __name__ == "__main__":
    app.run(
        debug=app.config["DEBUG"],
        host=app.config["IP_ADDRESS"],
        port=app.config["PORT"],
        use_reloader=app.config["RELOADER"],
    )
