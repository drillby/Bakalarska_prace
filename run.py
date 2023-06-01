from api import app, socketio

if __name__ == "__main__":
    socketio.run(app, host="192.168.132.103", port=8000, debug=True)
    # app.run(debug=True, host="192.168.132.103", port=8000)
