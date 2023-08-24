import http.server
import socketserver
import ssl
import os

PORT = int(os.environ.get("PORT", 8000))


class MyRequestHandler(http.server.SimpleHTTPRequestHandler):
    pass


httpd = socketserver.TCPServer(("", PORT), MyRequestHandler)
httpd.socket = ssl.wrap_socket(httpd.socket, keyfile="server.key", certfile="server.crt", server_side=True)

print(f"Serving at port {PORT}")
httpd.serve_forever()
