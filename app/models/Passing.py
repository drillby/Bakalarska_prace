import datetime
import uuid
from typing import Any, Dict, Optional

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Passing(db.Model):
    """
    A class representing a car passing event.

    Attributes:
        id (str): The unique identifier of the passing event.
        date_time (datetime.datetime): The date and time of the passing event.
        is_red (bool): A flag indicating whether the car passed on a red light.
    """
    __tablename__ = "CarPassing"
    id = db.Column(
        db.String(len(str(uuid.uuid1()))),
        primary_key=True,
        default=uuid.uuid1,
    )
    date_time = db.Column(db.types.DateTime(), default=datetime.datetime.today)
    is_red = db.Column(db.Boolean())

    def __init__(
        self, is_red: bool, date_time: Optional[datetime.datetime] = None
    ) -> None:
        """
        Initializes a new instance of the Passing class.

        Args:
            is_red (bool): A flag indicating whether the car passed on a red light.
            date_time (Optional[datetime.datetime], optional): The date and time of the passing event. Defaults to None.
        """
        if date_time is not None:
            self.date_time = date_time
        self.is_red = is_red

    def __repr__(self) -> str:
        """
        Returns a string representation of the Passing object.

        Returns:
            str: A string representation of the Passing object.
        """
        return f"<Passing id={self.id} date_time={self.date_time} is_red={self.is_red}>"

    def to_dict(self) -> Dict[str, Any]:
        """
        Returns a dictionary representation of the Passing object.

        Returns:
            Dict[str, Any]: A dictionary representation of the Passing object.
        """
        return {
            "id": self.id,
            "date_time": self.date_time.isoformat(),
            "is_red": self.is_red,
        }
