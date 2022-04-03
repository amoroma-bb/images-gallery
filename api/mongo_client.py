from pymongo import MongoClient

mongo_client = MongoClient(
    host="mongo",
    username="root",
    password="password",
    port=27017, 
)

def insert_test_document():
    """Insert sample document to the test_collection in the test db"""
    db = mongo_client.test
    test_collection = db.test_collection
    res = test_collection.insert_one({"name": "Chuxuan", "instructor":True, "age":24})
    print(res)