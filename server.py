import http.server
import socketserver

PORT = 6789

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print(f"Serving at http://0.0.0.0:{PORT}")
    httpd.serve_forever()
