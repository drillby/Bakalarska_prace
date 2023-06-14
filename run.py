from api import app

if __name__ == "__main__":
    app.run(
        debug=app.config["DEBUG"],
        host=app.config["IP_ADDRESS"],
        port=app.config["PORT"],
        use_reloader=app.config["RELOADER"],
    )
