import http.server
import socketserver

PORT = 8000


class MyRequestHandler(http.server.SimpleHTTPRequestHandler):
    pass


with socketserver.TCPServer(("", PORT), MyRequestHandler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()
