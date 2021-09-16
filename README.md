# Auth api with express

A simple authentication api with express and firestore database.

Api link -> https://auth-api-express.herokuapp.com/

## Api Route infomation
- At the root route `/` it return all the users in the database.
- To create a users you have send a **post** request to `/register` endpoint with username, email and password at the body of the request.

- To login a user you have to send **post** request to `/login` endpoint with email and password at the body of the requests.

- To get a spcific user you have to send a **get** request to `/:user_id` where *user_id* is the route parameter.

- To delete a user you have send **delete** request to `/delete/:user_id` where *user_id* is the route parameter.

- To change password you have send **put** requests to `/change_password` endpoint with user_id and updated_password at the body of the requests.


### Python code to test this api
```python
import requests  # pip install requests

url = "https://auth-api-express.herokuapp.com/"
res = requests.get(url)
print(res.json())

# Creating a user
res = requests.post(url + "/register", data={
	"username": "name",
	"email": "name@mail.com",
	"password": "password"
})

# Login a user
res = requests.post(url + "/login", data={
	"email": "name@mail.com",
	"password": "password"
})
print(res.json())

# Change password
res = requests.put(url + "/chnage_password", data={
	"user_id": "user_id",
	"updated_password": "updated_password"
})

# Delete a user
res = requests.delete(url + "/delete/:user_id") 
```
