from api import app

if __name__ == "__main__":
    app.run(debug=True, host="192.168.132.103", port=8000, use_reloader=False)
