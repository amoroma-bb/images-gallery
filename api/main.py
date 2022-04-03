from flask import Flask, request
import requests
from flask_cors import CORS
from mongo_client import insert_test_document


UNSPLASH_URL = 'https://api.unsplash.com/photos/random'
UNSPLASH_KEY = 'lcnbQwtQf-Ds2yebISscgTt4OHcsT-pKHygsvEH8u38'

app = Flask(__name__)
CORS(app)

insert_test_document()

@app.route("/new-image")
def new_image():
    word = request.args.get("query")

    headers = {
        "Accept-Version": "v1",
        "Authorization": "Client-ID " + UNSPLASH_KEY
    }

    params = {
        "query": word
    }

    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = response.json()
    return data


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)