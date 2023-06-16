import datetime
import json
import tempfile
import uuid
from typing import Dict, List, Optional

import pandas as pd
import sqlalchemy
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Passing(Base):
    __tablename__ = "CarPassing"
    id = sqlalchemy.Column(
        sqlalchemy.String(len(str(uuid.uuid1))),
        primary_key=True,
        default=str(uuid.uuid1),
    )
    datetime = sqlalchemy.Column(
        sqlalchemy.types.DateTime(), default=datetime.datetime.today
    )
    is_red = sqlalchemy.Column(sqlalchemy.Boolean())


class PassingHandler:
    def __init__(
        self,
        db_type: str,
        host: str,
        port: int,
        user: str,
        pw: str,
        db_name: str,
        table_rep: Passing,
    ) -> None:
        self.table_rep = table_rep
        engine = sqlalchemy.create_engine(
            f"{db_type}://{user}:{pw}@{host}:{port}/{db_name}"
        )
        self.Session = sqlalchemy.orm.sessionmaker()
        self.Session.configure(bind=engine)
        self.Session = self.Session()

    def write_to_db(self, addition: Passing) -> None:
        self.Session.add(addition)

    def get_from_db(self, **kwargs) -> List[Passing]:
        # is_red
        # on_datetime
        # from_datetime
        # to_datetime

        query = self.Session.query(self.table_rep)

        if "is_red" in kwargs:
            query = query.filter(self.table_rep.is_red == kwargs["is_red"])
        if "on_datetime" in kwargs:
            query = query.filter(self.table_rep.datetime == kwargs["on_datetime"])
        if "from_datetime" in kwargs:
            query = query.filter(self.table_rep.datetime >= kwargs["from_datetime"])
        if "to_datetime" in kwargs:
            query = query.filter(self.table_rep.datetime <= kwargs["to_datetime"])

        res = query.all()

        return res

    @staticmethod
    def to_dict(item: Passing):
        return vars(item)

    @staticmethod
    def to_obj(**kwargs):
        return Passing(**kwargs)

    @staticmethod
    def to_csv(items: List[Passing]) -> tempfile._TemporaryFileWrapper:
        lst = [[item.id, item.datetime, item.is_red] for item in items]
        headers = ["id", "datetime", "is_red"]

        df = pd.DataFrame(lst)
        temp_file = tempfile.NamedTemporaryFile(suffix=".csv", delete=False)

        df.to_csv(temp_file.name, index=False, header=headers, sep=";")

        return temp_file


if __name__ == "__main__":
    a = dict(is_red=0)
    b = PassingHandler.to_obj(**a)
    print(b.datetime, b.is_red)
