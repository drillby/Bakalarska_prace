import datetime
import tempfile
import uuid
from typing import Dict, List, Union

import pandas as pd
import sqlalchemy
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Passing(Base):
    """Table representation of CarPassing table in database"""

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
        """Constructor for PassingHandler class which handles database operations for CarPassing table in database

        Args:
            db_type (str): Database type (e.g. postgresql)
            host (str): Database host (e.g. localhost)
            port (int): Database port (e.g. 5432)
            user (str): Database user (e.g. root)
            pw (str): Database password (e.g. password)
            db_name (str): Database name (e.g. mydb)
            table_rep (Passing): Table representation of CarPassing table
        """
        self.table_rep = table_rep
        engine = sqlalchemy.create_engine(
            f"{db_type}://{user}:{pw}@{host}:{port}/{db_name}"
        )
        self.Session = sqlalchemy.orm.sessionmaker()
        self.Session.configure(bind=engine)
        self.Session = self.Session()

    def write_to_db(self, addition: Passing) -> None:
        """Writes a CarPassing object to database

        Args:
            addition (Passing): CarPassing object to be written to database
        """
        self.Session.add(addition)
        self.Session.commit()

    def get_from_db(self, **kwargs) -> List[Passing]:
        """Gets CarPassing objects from database based on given parameters in kwargs dictionary
        kwargs can contain following parameters:
            is_red (bool): Whether the traffic light was red or not
            on_datetime (datetime.datetime): Datetime of the passing
            from_datetime (datetime.datetime): Datetime from which the passing should be
            to_datetime (datetime.datetime): Datetime to which the passing should be
        Returns:
            List[Passing]: List of CarPassing objects
        """
        query = self.Session.query(self.table_rep)

        if "is_red" in kwargs:
            query = query.filter(self.table_rep.is_red == kwargs["is_red"])
        if "on_datetime" in kwargs:
            query = query.filter(self.table_rep.datetime == kwargs["on_datetime"])
            res = query.all()
            return res

        if "from_datetime" in kwargs:
            query = query.filter(self.table_rep.datetime >= kwargs["from_datetime"])
        if "to_datetime" in kwargs:
            query = query.filter(self.table_rep.datetime <= kwargs["to_datetime"])

        res = query.all()

        return res

    @staticmethod
    def to_dict(item: Passing) -> Dict[str, Union[str, datetime.datetime, bool]]:
        """Converts CarPassing object to dictionary

        Args:
            item (Passing): CarPassing object to be converted to dictionary

        Returns:
            Dict[str, Union[str, datetime.datetime, bool]]: Dictionary representation of CarPassing object
        """
        return dict(id=item.id, datetime=item.datetime, is_red=item.is_red)

    @staticmethod
    def to_obj(**kwargs: Dict[str, Union[str, datetime.datetime, bool]]) -> Passing:
        """Converts dictionary to CarPassing object

        Returns:
            Passing: CarPassing object
        """
        return Passing(**kwargs)

    @staticmethod
    def to_csv(items: List[Passing]) -> tempfile.NamedTemporaryFile:
        """Converts list of CarPassing objects to csv file

        Args:
            items (List[Passing]): List of CarPassing objects

        Returns:
            tempfile.NamedTemporaryFile: Temporary csv file
        """
        lst = [[item.id, item.datetime, item.is_red] for item in items]
        headers = ["id", "datetime", "is_red"]

        df = pd.DataFrame(lst)
        temp_file = tempfile.NamedTemporaryFile(suffix=".csv", delete=False)

        df.to_csv(temp_file.name, index=False, header=headers, sep=";")

        return temp_file

    def disconnect(self) -> None:
        """Closes database connection"""
        self.Session.close()


if __name__ == "__main__":
    a = dict(is_red=0)
    b = PassingHandler.to_obj(**a)
    print(b.datetime, b.is_red)
