from http.server import BaseHTTPRequestHandler
import json
import cgi
import os
from backend.sculpture_database import SculptureDatabase, SculptureData, TranslationString
from backend.auth import SECRET_KEY
import jwt
import logging
logger = logging.getLogger('main')

sculpture_db = SculptureDatabase()

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        auth_header = self.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            self.send_response(401)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Unauthorized'}).encode('utf-8'))
            return

        token = auth_header.split(' ')[1]
        try:
            jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            self.send_response(498, "Token expired")
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Token expired'}).encode('utf-8'))
            return
        except jwt.InvalidTokenError:
            self.send_response(401)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Invalid token'}).encode('utf-8'))
            return


        try:
            content_type, pdict = cgi.parse_header(self.headers.get('content-type'))
            if content_type == 'multipart/form-data':
                try:
                    pdict['boundary'] = bytes(pdict['boundary'], "utf-8")
                    pdict['CONTENT-LENGTH'] = int(self.headers['content-length'])
                    fields = cgi.parse_multipart(self.rfile, pdict)
                    sculpture_id = fields.get('sculpture_id')[0]
                    title = json.loads(fields.get('title')[0])
                    description = json.loads(fields.get('description')[0])
                    excerpt = json.loads(fields.get('excerpt')[0])
                    image = fields.get('image')
                    image_path = None
                    if(image):
                        image = image[0]
                        image_path = f'/tmp/{sculpture_id}.jpg'
                        with open(image_path, 'wb') as f:
                            f.write(image)
                    sdata = SculptureData(
                        sculpture_id=sculpture_id, 
                        image=image_path, 
                        title=TranslationString(**title), 
                        description=TranslationString(**description),
                        excerpt=TranslationString(**excerpt),
                        is_starred=fields.get('is_starred'))
                except Exception as e:
                    self.send_response(500, "Error parsing the form", repr(e))
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))

                try:
                    sculpture_db.upload_sculpture(sdata)
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'message': 'Sculpture uploaded successfully'}).encode('utf-8'))
                except Exception as e:
                    self.send_response(500, repr(e), repr(e))
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))
                finally:
                    if image_path:
                        os.remove(image_path)
            else:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'Invalid content type'}).encode('utf-8'))
        except Exception as e:
            self.send_response(500, "Internal Server Error", str(e))
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Invalid content type'}).encode('utf-8'))
            return

    def do_GET(self):
        query = self.path.split('?')[-1]
        try:
            params = dict(qc.split("=") for qc in query.split("&"))
        except Exception as e:
            params = {}
        sculpture_id = params.get('sculpture_id')
        if sculpture_id:
            try:
                sculpture = sculpture_db.get_sculpture(sculpture_id)
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(sculpture).encode('utf-8'))
                return
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': repr(e)}).encode('utf-8'))
                return
        else:
            try:
                sculptures = sculpture_db.list_sculptures()
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(sculptures).encode('utf-8'))
                return
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': repr(e)}).encode('utf-8'))
                return

    def do_DELETE(self):
        auth_header = self.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            self.send_response(401)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Unauthorized'}).encode('utf-8'))
            return

        token = auth_header.split(' ')[1]
        try:
            jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            self.send_response(498, "Token expired")
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Token expired'}).encode('utf-8'))
            return
        except jwt.InvalidTokenError:
            self.send_response(401, "Invalid token")
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Invalid token'}).encode('utf-8'))
            return

        query = self.path.split('?')[-1]
        try:
            params = dict(qc.split("=") for qc in query.split("&"))
        except Exception as e:
            params = {}
        sculpture_id = params.get('sculpture_id')

        if sculpture_id:
            try:
                sculpture_db.delete_sculpture(sculpture_id)
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'message': 'Sculpture deleted successfully'}).encode('utf-8'))
            except Exception as e:
                self.send_response(500, "Internal Server Error", str(e))
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))
        else:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Sculpture ID is required'}).encode('utf-8'))
