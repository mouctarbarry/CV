import http.server
import socketserver
import ssl
import os

PORT = int(os.environ.get("PORT", 8000))


class MyRequestHandler(http.server.SimpleHTTPRequestHandler):
    pass


httpd = socketserver.TCPServer(("", PORT), MyRequestHandler)

context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.load_cert_chain(certfile="server.crt", keyfile="server.key")

httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

print(f"Serving at port {PORT}")
httpd.serve_forever()
