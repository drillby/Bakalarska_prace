import datetime
import tempfile
from typing import List

import pandas as pd
from flask import jsonify, request, send_file

from app import api_logger, app, db
from app.models.Passing import Passing


@app.route("/get_data", methods=["GET"])
def get_from_db():
    from_datetime = request.args.get("from_datetime")
    to_datetime = request.args.get("to_datetime")
    on_datetime = request.args.get("on_datetime")
    is_red = request.args.get("is_red")

    if from_datetime:
        from_datetime = datetime.datetime.strptime(from_datetime, "%Y-%m-%d %H:%M:%S")
    if to_datetime:
        to_datetime = datetime.datetime.strptime(to_datetime, "%Y-%m-%d %H:%M:%S")
    if on_datetime:
        on_datetime = datetime.datetime.strptime(on_datetime, "%Y-%m-%d %H:%M:%S")
    if is_red:
        is_red = True if is_red == "True" else False

    query = db.session.query(Passing)
    if from_datetime:
        query = query.filter(Passing.date_time >= from_datetime)
    if to_datetime:
        query = query.filter(Passing.date_time <= to_datetime)
    if on_datetime and (not from_datetime or not to_datetime):
        query = query.filter(Passing.date_time == on_datetime)
    if is_red:
        query = query.filter(Passing.is_red == is_red)

    api_logger.info(f"Recieved query: {query}")
    query: List[Passing] = query.all()

    return jsonify(
        {
            "data": [passing.to_dict() for passing in query],
        }
    )


@app.route("/download_data", methods=["GET"])
def download_from_db():
    from_datatime = request.args.get("from_datetime")
    to_datetime = request.args.get("to_datetime")
    on_datetime = request.args.get("on_datetime")
    is_red = request.args.get("is_red")

    query = db.session.query(Passing)
    if from_datatime:
        query = query.filter(Passing.date_time >= from_datatime)
    if to_datetime:
        query = query.filter(Passing.date_time <= to_datetime)
    if on_datetime and (not from_datatime or not to_datetime):
        query = query.filter(Passing.date_time == on_datetime)
    if is_red:
        query = query.filter(Passing.is_red == is_red)

    api_logger.info(f"Recieved query: {query}")
    query: List[Passing] = query.all()

    header = ["id", "date_time", "is_red"]
    df = pd.DataFrame(
        [[passing.id, passing.date_time, passing.is_red] for passing in query]
    )
    with tempfile.NamedTemporaryFile() as tmp:
        df.to_csv(tmp.name, header=header, index=False, sep=";")
        return send_file(tmp.name, as_attachment=True, download_name="passing_data.csv")
