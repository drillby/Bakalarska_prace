from flask import jsonify, request

from app import api_logger, app, db
from app.models.Passing import Passing


@app.route("/get_data", methods=["GET"])
def get_from_db():
    from_datatime = request.args.get("from_datetime")
    to_datetime = request.args.get("to_datetime")
    on_datetime = request.args.get("on_datetime")
    is_red = request.args.get("is_red")

    query = db.session.query(Passing)
    if from_datatime:
        query = query.filter(Passing.datetime >= from_datatime)
    if to_datetime:
        query = query.filter(Passing.datetime <= to_datetime)
    if on_datetime and (not from_datatime or not to_datetime):
        query = query.filter(Passing.datetime == on_datetime)
    if is_red:
        query = query.filter(Passing.is_red == is_red)

    query = query.all()

    api_logger.info(f"Recieved query: {query}")

    return jsonify(
        {
            "data": [passing.to_dict() for passing in query],
        }
    )
