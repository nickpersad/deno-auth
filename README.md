# deno-mongo-auth

---

A (Deno)[https://deno.land/] app for basic authentication using MongoDB.

## Running Locally

Prerequisites: [Deno](https://deno.land/#installation). [MongoDB](https://www.mongodb.com/download-center/community).

```sh
git clone https://github.com/nickpersad/deno-auth.git
cd deno-auth
#Copy default config file and add your config variables
cp config.default.ts config.ts
#Run Deno, downloading any dependencies needed to cache
make (or deno -A --unstable index.ts)
```

Your app should now be running on [localhost:4000](http://localhost:4000/) or whatever you set in config.ts.

## API endpoints
All requests must be POST requests, GET requests are forbidden.

###### <denoapp-endpoint>/api/signup
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

###### <denoapp-endpoint>/api/signin
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

###### <denoapp-endpoint>/api/user
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

###### <denoapp-endpoint>/api/signout
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