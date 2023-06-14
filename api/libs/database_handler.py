import uuid

import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Passing(Base):
    __tablename__ = "CarPassing"
    id = sqlalchemy.Column(
        sqlalchemy.String(len(str(uuid.uuid1()))),
        primary_key=True,
    )
    date = sqlalchemy.Column(sqlalchemy.types.DateTime())
    is_red = sqlalchemy.Column(sqlalchemy.Boolean())
