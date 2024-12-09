from typing import TypedDict, NotRequired


class InsertableBook(TypedDict):
    name: str
    year_of_publication: NotRequired[int]
    isbn: NotRequired[str]
    volume_in_stock: int


class UpdateableBook(TypedDict):
    name: NotRequired[str]
    year_of_publication: NotRequired[int]
    isbn: NotRequired[str]
    volume_in_stock: NotRequired[int]


class Book(InsertableBook):
    id: str
