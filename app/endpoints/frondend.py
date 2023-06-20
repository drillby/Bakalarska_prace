import datetime
import random
import tempfile
from typing import List

import pandas as pd
from flask import Response, jsonify, request, send_file

from app import api_logger, app, db
from app.models.Passing import Passing


@app.route("/get_data", methods=["GET"])
def get_from_db():
    from_datetime = request.args.get("from_datetime")
    to_datetime = request.args.get("to_datetime")
    on_datetime = request.args.get("on_datetime")
    is_red = request.args.get("is_red")

    if from_datetime:
        try:
            from_datetime = datetime.datetime.strptime(
                from_datetime, "%Y-%m-%d %H:%M:%S"
            )
        except ValueError:
            api_logger.error(f"Invalid from_datetime format: {from_datetime}")
            return Response(
                "Invalid from_datetime format. Should be YYYY-MM-DD HH:MM:SS",
                status=400,
            )
    if to_datetime:
        try:
            to_datetime = datetime.datetime.strptime(to_datetime, "%Y-%m-%d %H:%M:%S")
        except ValueError:
            api_logger.error(f"Invalid to_datetime format: {to_datetime}")
            return Response(
                "Invalid to_datetime format. Should be YYYY-MM-DD HH:MM:SS", status=400
            )
    if on_datetime:
        try:
            on_datetime = datetime.datetime.strptime(on_datetime, "%Y-%m-%d %H:%M:%S")
        except ValueError:
            api_logger.error(f"Invalid on_datetime format: {on_datetime}")
            return Response(
                "Invalid on_datetime format. Should be YYYY-MM-DD HH:MM:SS", status=400
            )
    if is_red:
        try:
            is_red = True if is_red.strip().lower() == "true" else False
        except ValueError:
            api_logger.error(f"Invalid is_red format: {is_red}")
            return Response(
                "Invalid is_red format. Should be True or False", status=400
            )

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
    from_datetime = request.args.get("from_datetime")
    to_datetime = request.args.get("to_datetime")
    on_datetime = request.args.get("on_datetime")
    is_red = request.args.get("is_red")

    if from_datetime:
        try:
            from_datetime = datetime.datetime.strptime(
                from_datetime, "%Y-%m-%d %H:%M:%S"
            )
        except ValueError:
            api_logger.error(f"Invalid from_datetime format: {from_datetime}")
            return Response(
                "Invalid from_datetime format. Should be YYYY-MM-DD HH:MM:SS",
                status=400,
            )
    if to_datetime:
        try:
            to_datetime = datetime.datetime.strptime(to_datetime, "%Y-%m-%d %H:%M:%S")
        except ValueError:
            api_logger.error(f"Invalid to_datetime format: {to_datetime}")
            return Response(
                "Invalid to_datetime format. Should be YYYY-MM-DD HH:MM:SS", status=400
            )
    if on_datetime:
        try:
            on_datetime = datetime.datetime.strptime(on_datetime, "%Y-%m-%d %H:%M:%S")
        except ValueError:
            api_logger.error(f"Invalid on_datetime format: {on_datetime}")
            return Response(
                "Invalid on_datetime format. Should be YYYY-MM-DD HH:MM:SS", status=400
            )
    if is_red:
        try:
            is_red = True if is_red.strip().lower() == "true" else False
        except ValueError:
            api_logger.error(f"Invalid is_red format: {is_red}")
            return Response(
                "Invalid is_red format. Should be True or False", status=400
            )

    api_logger.info(f"Recieved query: {query}")
    query: List[Passing] = query.all()

    header = ["id", "date_time", "is_red"]
    df = pd.DataFrame(
        [[passing.id, passing.date_time, passing.is_red] for passing in query]
    )
    with tempfile.NamedTemporaryFile() as tmp:
        df.to_csv(tmp.name, header=header, index=False, sep=";")
        return send_file(tmp.name, as_attachment=True, download_name="passing_data.csv")


@app.route("/generate_dummy_data/<int:num_to_gen>", methods=["POST"])
def gen_dummy_data(num_to_gen: int):
    for _ in range(num_to_gen):
        # gebnerate random datetime
        date_time = datetime.datetime.now() - datetime.timedelta(
            seconds=random.randint(0, 60 * 60 * 24 * 365)
        )
        # generate random is_red
        is_red = random.choice([True, False])

        passing = Passing(date_time=date_time, is_red=is_red)
        db.session.add(passing)
        api_logger.info(f"Added entry to database: {repr(passing)}")
    db.session.commit()
    return jsonify(
        {
            "status": "ok",
            "message": f"Generated {num_to_gen} entries",
        }
    )

    # create test curl command:
    # curl -X POST -H "Content-Type: application/json" http://192.168.132.103:8000/generate_dummy_data/10
