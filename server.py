import http.server
from http.server import BaseHTTPRequestHandler, HTTPServer
import logging
import socketserver
import socket
from path_Selector import open_File
from save_Users_Files import *
import datetime

def log(id, port, req):
    with open("log.txt", "a", encoding = "utf-8") as file:
        file.write(f"ID: {id}; PORT: {port}; TIME: {datetime.datetime.now()}; REQUEST: {req}\n")

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
        log(self.client_address[0], self.client_address[1], self.path)
    def do_POST(self):
        global host_Name
        print(f"[NEW POST] {self.path}")
        content_length = int(self.headers['Content-Length'])
        print(content_length)
        post_data = self.rfile.read(content_length)
        data = control_Users(self.client_address[0], self.path, post_data, host_Name)
        print(post_data)
        self.send_response(200)
        self.send_header("Content-text", "text/txt")
        self.end_headers()
        self.wfile.write(data.encode("utf-8"))

handler_object = MyHttpRequestHandler

PORT = 8000
IP = socket.gethostbyname(socket.gethostname())
server = socketserver.TCPServer((IP, PORT), handler_object)
print(f"Server started ({IP}:{PORT})")
host_Name = f"{IP}:{PORT}"
server.serve_forever()
