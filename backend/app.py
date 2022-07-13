from flask import Flask, request, Response
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


@app.route("/auth", methods=["POST"])
def auth():
    request_data = request.get_json()
    login = request_data["login"]
    password = request_data["password"]

    if(login != "user" or password != "password"):
        error_msg = {
            "message": "Authentication error"
        }
        response = Response(json.dumps(error_msg), 400, mimetype="application/json")
        return response
    
    response = Response(json.dumps({ "userId": "1234567890" }), 200, mimetype="application/json")
    return response


if __name__ == "__main__":
    app.run(debug=True)
