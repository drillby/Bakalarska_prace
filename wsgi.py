from api import app

if __name__ == "__main__":
    app.run()
#  gunicorn --bind ip:port wsgi:app
