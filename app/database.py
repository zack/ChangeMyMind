from google.cloud import datastore

def get_client():
    return datastore.Client()

def put_debate(user_a, user_b, transcript):
    ds = get_client()
    task_key = ds.key("debate") # key will be generated automatically
    task = datastore.Entity(key=task_key)
    task["user_a"] = user_a
    task["user_b"] = user_b
    task["transcript"] = transcript
    ds.put(task)
    return task

def get_debates():
    ds = get_client()
    return ds.query(kind="debate").fetch()


#print([result for result in ds.query(kind="Example").fetch()])
