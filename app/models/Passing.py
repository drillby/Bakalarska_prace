import datetime
import uuid
from typing import Optional

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Passing(db.Model):
    """Table representation of CarPassing table in database"""

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
        if date_time is not None:
            self.date_time = date_time
        self.is_red = is_red

    def __repr__(self) -> str:
        return f"<Passing {self.id} {self.date_time} {self.is_red}>"
