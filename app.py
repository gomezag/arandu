import http.server
import socketserver
from api.sculptures import handler as sculptures_handler
from api.login import handler as login_handler
PORT = 8000

class MyHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/api/sculptures":
            sculptures_handler.do_GET(self)
        elif self.path == "/api/login":
            login_handler.do_GET(self)
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not found")
    
    def do_POST(self):
        if self.path == "/api/sculptures":
            sculptures_handler.do_POST(self)
        elif self.path == "/api/login":
            login_handler.do_POST(self)
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not found")

    def do_DELETE(self):
        if self.path == "/api/sculptures":
            sculptures_handler.do_DELETE(self)
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not found")
            

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
        print(f"Serving on port {PORT}")
        httpd.serve_forever()

