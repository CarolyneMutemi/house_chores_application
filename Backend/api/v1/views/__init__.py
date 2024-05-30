"""
Creates the Blueprint
"""
from flask import Blueprint
from flask_pymongo import PyMongo
import redis

app_views = Blueprint('app_views', __name__)
mongo = PyMongo()
redis_client = redis.Redis()

from api.v1.views.services import *
from api.v1.views.providers import *
from api.v1.views.towns import *
from api.v1.views.users import *
from api.v1.views.chores import *
