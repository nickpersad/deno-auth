# deno-mongo-auth

---

A (Deno)[https://deno.land/] app for basic authentication using MongoDB.

## Running Locally

Prerequisites: [Node.js](http://nodejs.org/). [MongoDB](https://www.mongodb.com/download-center/community).

```sh
git clone https://github.com/nickpersad/nodejs-mongodb-auth.git
cd nodejs-mongodb-auth
npm install
#Copy default environment file and add your config variables
cp .env.default .env
#Run in dev environment with hot reload or run with built app
deno run --allow-net index.ts
```

Your app should now be running on [localhost:8080](http://localhost:8080/).

## API endpoints
All requests must be POST requests, GET requests are forbidden.

###### <nodeapp-endpoint>/api/signup
Only allows unique users, if a user exist, the user will be rejected. Passwords are hashed using [bcrypt] (https://en.wikipedia.org/wiki/Bcrypt). 
__Sample request__
```sh
{
	"username": "accessnick@gmail.com",
	"password": "qwerty123456"
}
```
__Sample response__
```sh
{
  "success": true,
  "id": "5eb1a808b6228ew2b582ds19"
}
```

###### <nodeapp-endpoint>/api/signin
__Sample request__
```sh
{
	"username": "accessnick@gmail.com",
	"password": "qwerty123456"
}
```
__Sample response__
```sh
{
  "success": true,
  "id": "5eb1a808b6228ew2b582ds19"
}
```

###### <nodeapp-endpoint>/api/user
__Sample request__
```sh
{}
```
__Sample response__
```sh
{
  "success": true,
  "results": [
    {
      "id": "22966r34df38a67003e55c11",
      "username": "nick@visionforwardmarketing.com"
    },
    {
      "id": "5496921c990295718393a896",
      "username": "accessnick@gmail.com"
    }
  ]
}
```

###### <nodeapp-endpoint>/api/signout
__Sample request__
```sh
{
    "username": "accessnick@gmail.com"
}
```
__Sample response__
```sh
{
  "success": true
}
```

## Environment file (.env)

```sh
########################################################################
##   Environment variables used for Node App
##
##   DEBUG - 1 is ON: errors/info will be shown in console. 0 is OFF: errors/info will be shown in GrayLog.
##   PORT - Port to set Node to listen on.
##   APPLICATION_NAME - Name of application.
##   MONGODB_CONNECTION - Connection to MongoDB.
##   EMAIL_HOST - Email hostname
##   EMAIL_PORT - Email port
##   EMAIL_USER - Email address/username
##   EMAIL_PASS - Email password
##
########################################################################
```
