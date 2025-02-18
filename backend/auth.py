import os
import jwt
import datetime

SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')

def generate_token(password):
    if password == os.getenv('ADMIN_PASSWORD'):
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1),
            'iat': datetime.datetime.utcnow()
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        return token
    else:
        raise ValueError('Invalid password')