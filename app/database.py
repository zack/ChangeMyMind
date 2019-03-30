from google.cloud import datastore

def get_client():
    return datastore.Client()

def put_debate(id, user, transcript):
    ds = get_client()
    task_key = ds.key("debate", id) # unique ID for this entity
    task = datastore.Entity(key=task_key)
    task["user"] = user
    task["transcript"] = transcript
    ds.put(task)
    return task

def get_debates():
    ds = get_client()
    return str(list(ds.query(kind="debate").fetch()))


#print([result for result in ds.query(kind="Example").fetch()])
