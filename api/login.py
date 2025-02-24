import os
import json
import jwt
from http.server import BaseHTTPRequestHandler
from datetime import datetime, timedelta

SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
PASSWORD = os.getenv('ADMIN_PASSWORD')

class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        print('Login handler')
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)
        password = data.get('password')
        if password != PASSWORD:
            self.send_response(401)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Invalid password'}).encode('utf-8'))
            return  # Add return here to prevent further writes

        payload = {
            'exp': datetime.utcnow() + timedelta(hours=1),
            'iat': datetime.utcnow()
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({'token': token}).encode('utf-8'))
        return  # Add return here to prevent further writes