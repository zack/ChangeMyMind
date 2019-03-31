import socket
import subprocess

import pytest
import requests
from retrying import retry
import websocket


@pytest.fixture(scope='module')
def server():
    """Provides the address of a test HTTP/websocket server.
    The test server is automatically created before
    a test and destroyed at the end.
    """
    # Ask the OS to allocate a port.
    sock = socket.socket()
    sock.bind(('127.0.0.1', 0))
    port = sock.getsockname()[1]

    # Free the port and pass it to a subprocess.
    sock.close()

    bind_to = '127.0.0.1:{}'.format(port)
    server = subprocess.Popen(
        ['gunicorn', '-b', bind_to, '-k' 'flask_sockets.worker', 'main:app'])

    # Wait until the server responds before proceeding.
    @retry(wait_fixed=50, stop_max_delay=5000)
    def check_server(url):
        requests.get(url)

    check_server('http://{}/'.format(bind_to))

    yield bind_to

    server.kill()


def test_http(server):
    result = requests.get('http://{}/'.format(server))
    assert 'Python Websockets Chat' in result.text


def test_websocket(server):
    url = 'ws://{}/chat'.format(server)
    ws_one = websocket.WebSocket()
    ws_one.connect(url)

    ws_two = websocket.WebSocket()
    ws_two.connect(url)

    message = 'Hello, World'
    ws_one.send(message)

    assert ws_one.recv() == message
    assert ws_two.recv() == message