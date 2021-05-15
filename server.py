import http.server
from http.server import BaseHTTPRequestHandler, HTTPServer
import logging
import socketserver
import socket
from path_Selector import open_File

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        data = b"Not Found"
        print(f"[NEW GET] {self.path}")
        data, type, response = open_File(self.path, self.client_address)
        self.send_response(response)
        if type == ".html":
            self.send_header("Content-text", "text/html")
        elif type == ".css":
            self.send_header("Content-text", "text/css")
        elif type == ".png":
            self.send_header("Content-text", "image/png")
        self.end_headers()
        self.wfile.write(data)

handler_object = MyHttpRequestHandler

PORT = 8000
IP = socket.gethostbyname(socket.gethostname())
server = socketserver.TCPServer((IP, PORT), handler_object)
print(f"Server started ({IP}:{PORT})")
server.serve_forever()
