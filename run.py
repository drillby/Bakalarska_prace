from app import app, db

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        app.run(
            debug=app.config["DEBUG"],
            host=app.config["IP_ADDRESS"],
            port=app.config["PORT"],
            use_reloader=app.config["RELOADER"],
        )
