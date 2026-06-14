"""
Runtime dataset state.

Stores the active dataset_id — assigned on every new CSV upload so all
dynamic API handlers can include a consistent identity in their responses.
Also tracks OpenAI file_id and vector_store_id for the AI Data Agent feature.
"""
import uuid

_current_dataset_id: str = ""
_openai_file_id: str = ""
_vector_store_id: str = ""
_currency_symbol: str = ""


def new_dataset_id() -> str:
    """Generate a fresh UUID, activate it, and return it."""
    global _current_dataset_id
    _current_dataset_id = str(uuid.uuid4())
    return _current_dataset_id


def get_dataset_id() -> str:
    return _current_dataset_id


def get_openai_file_id() -> str:
    return _openai_file_id


def set_openai_file_id(file_id: str) -> None:
    global _openai_file_id
    _openai_file_id = file_id


def get_vector_store_id() -> str:
    return _vector_store_id


def set_vector_store_id(vs_id: str) -> None:
    global _vector_store_id
    _vector_store_id = vs_id


def get_currency_symbol() -> str:
    return _currency_symbol


def set_currency_symbol(symbol: str) -> None:
    global _currency_symbol
    _currency_symbol = symbol
