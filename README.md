# Developer Profile API

Simple REST API build using Express.js to store and retrieve account usernames associated with an email address via SQLite database.

## Start Server
`npm run start`
or
`node app.js`

## Endpoints

### GET /user/:email
Returns JSON data containing account usernames associated with specified email address.

Example request:
```
curl -X GET http://localhost/user/alex@example.com
```

Example response: 
```
{
    "data": {
        "email": "alex@example.com",
        "linkedin": "alexmckinnon",
        "github": "alexmckinnon"
    }
}
```

### POST /user
Store a new user in the database. 

#### Request Body
```
{
    "data": {
        "email": String
        "linkedin": String
        "github": String
    }
}
```

Example request:
```
curl -d '{"data": {"email":"alex@example.com", "github": "alexmckinnon", "linkedin": "alexmckinnon"}}' -H "Content-Type: application/json" -X POST http://localhost/user

```

