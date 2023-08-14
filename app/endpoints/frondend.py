import datetime
import random
import tempfile
from typing import List

import pandas as pd
from flask import Response, jsonify, request, send_file
from sqlalchemy import desc

from app import api_logger, app, db
from app.models.Passing import Passing


@app.route("/get_data", methods=["GET"])
def get_from_db() -> Response:
    """REST endpoint for getting data from database
    Typical endpoint call:
    http://localhost:5000/get_data?from_date=2021-01-01T00:00:00Z&to_date=2021-01-01T23:59:59Z&color=all

    Args:
        from_date (str, optional): Begining of the time interval. Defaults to None. Accepts ISO 8601 format.
        to_date (str, optional): End of the time interval. Defaults to None. Accepts ISO 8601 format.
        on_date (str, optional): Date of the day. Defaults to None. Accepts ISO 8601 format.
        color (str, optional): . Defaults to None. Accepts "all", "red", "green".


    Returns:
        Response: JSON with data from database or error message
    """

    # get query parameters
    from_datetime = request.args.get("from_date")
    to_datetime = request.args.get("to_date")
    on_datetime = request.args.get("on_date")
    color = request.args.get("color")

    # validate from_datetime format and convert to datetime
    if from_datetime:
        try:
            from_datetime = datetime.datetime.fromisoformat(
                from_datetime.replace("Z", "")
            )
        except ValueError:
            api_logger.error(f"Invalid from_datetime format: {from_datetime}")
            response = jsonify(
                {
                    "error_text": "Nesprávný formát u atributu from_date.",
                    "error_subtext": "Očekáván ISO 8601 formát se Z na konci (např. 2021-01-01T00:00:00Z)",
                }
            )
            response.status_code = 400
            return response

    # validate to_datetime format and convert to datetime
    if to_datetime:
        try:
            to_datetime = datetime.datetime.fromisoformat(to_datetime.replace("Z", ""))
        except ValueError:
            api_logger.error(f"Invalid to_datetime format: {to_datetime}")
            response = jsonify(
                {
                    "error_text": "Nesprávný formát u atributu to_datetime.",
                    "error_subtext": "Očekáván ISO 8601 formát se Z na konci (např. 2021-01-01T00:00:00Z)",
                }
            )
            response.status_code = 400
            return response

    # validate on_datetime format and convert to datetime
    if on_datetime:
        try:
            on_datetime = datetime.datetime.fromisoformat(on_datetime.replace("Z", ""))
        except ValueError:
            api_logger.error(f"Invalid on_datetime format: {on_datetime}")
            response = jsonify(
                {
                    "error_text": "Nesprávný formát u atributu on_datetime.",
                    "error_subtext": "Očekáván ISO 8601 formát se Z na konci (např. 2021-01-01T00:00:00Z)",
                }
            )
            response.status_code = 400
            return response

    # validate color format
    if color not in ["all", "red", "green"]:
        response = jsonify(
            {
                "error_text": "Nesprávný formát u atributu is_red.",
                "error_subtext": "Očekáván string s jednou z těchto hodnot - red, green, all",
            },
        )
        response.status_code = 400
        return response

    # create query and filter it
    query = db.session.query(Passing)
    if from_datetime:
        query = query.filter(Passing.date_time >= from_datetime)
    if to_datetime:
        query = query.filter(Passing.date_time <= to_datetime)
    if on_datetime and (not from_datetime or not to_datetime):
        day_start = on_datetime.replace(hour=0, minute=0)
        day_end = on_datetime.replace(hour=23, minute=59, second=59)

        query = query.filter(Passing.date_time >= day_start)
        query = query.filter(Passing.date_time <= day_end)

    if color == "red":
        query = query.filter(Passing.is_red == True)
    elif color == "green":
        query = query.filter(Passing.is_red == False)

    api_logger.info(f"Recieved query: {query}")
    # execute query
    query: List[Passing] = query.order_by(desc(Passing.date_time)).all()

    res = jsonify(
        {
            "data": [passing.to_dict() for passing in query],
        }
    )
    res.status_code = 200

    return res


@app.route("/download_data", methods=["GET"])
def download_from_db() -> Response:
    """REST endpoint for dowloading data from database
    Typical endpoint call:
    http://localhost:5000/download_data?from_date=2021-01-01T00:00:00Z&to_date=2021-01-01T23:59:59Z&color=all

    Args:
        from_date (str, optional): Begining of the time interval. Defaults to None. Accepts ISO 8601 format.
        to_date (str, optional): End of the time interval. Defaults to None. Accepts ISO 8601 format.
        on_date (str, optional): Date of the day. Defaults to None. Accepts ISO 8601 format.
        color (str, optional): . Defaults to None. Accepts "all", "red", "green".


    Returns:
        Response: JSON with data from database or error message
    """

    # get query parameters
    from_datetime = request.args.get("from_date")
    to_datetime = request.args.get("to_date")
    on_datetime = request.args.get("on_date")
    color = request.args.get("color")

    # validate from_datetime format and convert to datetime
    if from_datetime:
        try:
            from_datetime = datetime.datetime.fromisoformat(
                from_datetime.replace("Z", "")
            )
        except ValueError:
            api_logger.error(f"Invalid from_datetime format: {from_datetime}")
            response = jsonify(
                {
                    "error_text": "Nesprávný formát u atributu from_date.",
                    "error_subtext": "Očekáván ISO 8601 formát se Z na konci (např. 2021-01-01T00:00:00Z)",
                }
            )
            response.status_code = 400
            return response

    # validate to_datetime format and convert to datetime
    if to_datetime:
        try:
            to_datetime = datetime.datetime.fromisoformat(to_datetime.replace("Z", ""))
        except ValueError:
            api_logger.error(f"Invalid to_datetime format: {to_datetime}")
            response = jsonify(
                {
                    "error_text": "Nesprávný formát u atributu to_datetime.",
                    "error_subtext": "Očekáván ISO 8601 formát se Z na konci (např. 2021-01-01T00:00:00Z)",
                }
            )
            response.status_code = 400
            return response

    # validate on_datetime format and convert to datetime
    if on_datetime:
        try:
            on_datetime = datetime.datetime.fromisoformat(on_datetime.replace("Z", ""))
        except ValueError:
            api_logger.error(f"Invalid on_datetime format: {on_datetime}")
            response = jsonify(
                {
                    "error_text": "Nesprávný formát u atributu on_datetime.",
                    "error_subtext": "Očekáván ISO 8601 formát se Z na konci (např. 2021-01-01T00:00:00Z)",
                }
            )
            response.status_code = 400
            return response

    # validate color format
    if color not in ["all", "red", "green"]:
        response = jsonify(
            {
                "error_text": "Nesprávný formát u atributu is_red.",
                "error_subtext": "Očekáván string s jednou z těchto hodnot - red, green, all",
            },
        )
        response.status_code = 400
        return response

    # create query and filter it
    query = db.session.query(Passing)
    if from_datetime:
        query = query.filter(Passing.date_time >= from_datetime)
    if to_datetime:
        query = query.filter(Passing.date_time <= to_datetime)
    if on_datetime and (not from_datetime or not to_datetime):
        day_start = on_datetime.replace(hour=0, minute=0)
        day_end = on_datetime.replace(hour=23, minute=59, second=59)

        query = query.filter(Passing.date_time >= day_start)
        query = query.filter(Passing.date_time <= day_end)

    if color == "red":
        query = query.filter(Passing.is_red == True)
    elif color == "green":
        query = query.filter(Passing.is_red == False)

    api_logger.info(f"Recieved query: {query}")
    # execute query
    query: List[Passing] = query.all()

    # create dataframe
    header = ["id", "date_time", "is_red"]
    df = pd.DataFrame(
        [[passing.id, passing.date_time, passing.is_red] for passing in query]
    )
    # create temp file and send it
    with tempfile.NamedTemporaryFile() as tmp:
        df.to_csv(tmp.name, header=header, index=False, sep=";")
        return send_file(tmp.name, as_attachment=True, download_name="passing_data.csv")


@app.route("/generate_dummy_data/<int:num_to_gen>", methods=["POST"])
def gen_dummy_data(num_to_gen: int) -> Response:
    """
    Generates dummy data and adds it to the database.
    Typical endpoint call:
    http://localhost:5000/generate_dummy_data/100 (generates 100 entries)

    Args:
        num_to_gen (int): The number of entries to generate.

    Returns:
        Response: A JSON response with a status message and the number of entries generated.
    """
    if num_to_gen < 0:
        api_logger.warning("Negative num requested")
        response = jsonify(
            {
                "error_text": "Neočekávaný počet záznamů",
                "error_subtext": "Minilální počet záznamů pro vytvoření je 1",
            },
        )
        response.status_code = 400

    for _ in range(num_to_gen):
        # generate random datetime in last year
        date_time = datetime.datetime.now() - datetime.timedelta(
            seconds=random.randint(0, 60 * 60 * 24 * 365)
        )
        # generate random is_red
        is_red = random.choice([True, False])

        # create and add entry to database
        passing = Passing(date_time=date_time, is_red=is_red)
        db.session.add(passing)
        api_logger.info(f"Added entry to database: {repr(passing)}")
    db.session.commit()
    response = jsonify(
        {
            "status": "ok",
            "message": f"Generated {num_to_gen} entries",
        }
    )
    response.status_code = 201
    return response
