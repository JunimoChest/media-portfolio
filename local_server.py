"""Local static server with HTTP Range support so video seeking works."""

import argparse
import mimetypes
import os
import re
import sys
import webbrowser
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

RANGE_RE = re.compile(r"bytes=(\d*)-(\d*)$")

mimetypes.add_type("application/vnd.apple.mpegurl", ".m3u8")
mimetypes.add_type("video/mp2t", ".ts")


class RangeRequestHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            return super().send_head()
        try:
            f = open(path, "rb")
        except OSError:
            self.send_error(404, "File not found")
            return None
        try:
            size = os.fstat(f.fileno()).st_size
            ctype = self.guess_type(path)
            match = RANGE_RE.fullmatch(self.headers.get("Range", "").strip())
            if not match or size == 0:
                self.send_response(200)
                self.send_header("Content-type", ctype)
                self.send_header("Content-Length", str(size))
                self.send_header("Accept-Ranges", "bytes")
                self.send_header("Last-Modified", self.date_time_string(os.fstat(f.fileno()).st_mtime))
                self.end_headers()
                return f

            start_text, end_text = match.groups()
            if not start_text and not end_text:
                self.send_error(400, "Invalid Range")
                f.close()
                return None
            if start_text:
                start = int(start_text)
                end = int(end_text) if end_text else size - 1
            else:
                start = max(size - int(end_text), 0)
                end = size - 1
            if start >= size or start > end:
                self.send_response(416)
                self.send_header("Content-Range", f"bytes */{size}")
                self.send_header("Content-Length", "0")
                self.end_headers()
                f.close()
                return None
            end = min(end, size - 1)
            self.send_response(206)
            self.send_header("Content-type", ctype)
            self.send_header("Accept-Ranges", "bytes")
            self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
            self.send_header("Content-Length", str(end - start + 1))
            self.send_header("Last-Modified", self.date_time_string(os.fstat(f.fileno()).st_mtime))
            self.end_headers()
            f.seek(start)
            return f
        except Exception:
            f.close()
            raise


def bind_server(preferred_port):
    for port in range(preferred_port, preferred_port + 20):
        try:
            server = ThreadingHTTPServer(("127.0.0.1", port), partial(RangeRequestHandler, directory=os.getcwd()))
            return server, port
        except OSError:
            continue
    return None, None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8130)
    args = parser.parse_args()

    server, port = bind_server(args.port)
    if server is None:
        print("No free port found. Close other local servers and try again.")
        return 1

    url = f"http://127.0.0.1:{port}/"
    print(f"Site ready: {url}")
    print("Keep this window open while browsing. Close it to stop.")
    try:
        webbrowser.open(url)
    except Exception:
        pass
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
