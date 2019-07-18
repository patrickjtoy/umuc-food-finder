# UMUC Food Finder

## Getting Started

### Install Docker

Download [Docker Community Edition](https://hub.docker.com/search?q=&type=edition&offering=community):
**Note:** The minimum Docker version is **18.06**

- [macOS](https://hub.docker.com/editions/community/docker-ce-desktop-mac)
- [Linux](https://hub.docker.com/search/?type=edition&offering=community&operating_system=linux)
- [Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows)

### Setup

Run the following commands in your terminal after cloning the repo:

1. `touch .env`
2. `cp docker-compose.override.example.yml docker-compose.override.yml`
3. If you're using Docker for Windows, add `DOCKER_DEV_PLATFORM=windows` to your `.env` file to get file watching working
4. `docker-compose run --rm app yarn db:migrate`

### Running

1. `docker-compose up`
2. Open up `http://localhost:3000` and you should see the application!

### Rebuilding

`yarn run docker:rebuild`

## API

### POST `/api/authenticate`

Log the user in

Request body:

```
{
  email: 'tyler@tylerodonnell.com',
  password: 'hunter2'
}
```

Request response:

```
{
  "user": {
    "id": 38,
    "firstName": 'Tyler',
    "lastName": 'O\'Donnell',
    "email": "tyler@tylerodonnell.com",
    "createdAt": "2019-06-25T03:21:25.363Z",
    "updatedAt": "2019-06-25T03:21:25.363Z"
  },
  "token": "Bearer <token>"
}
```

### POST `/api/register`

Register a user account

Request body:

```
{
  email: 'tyler@tylerodonnell.com',
  password: 'hunter2',
  firstName: 'Tyler',
  lastName: 'O\'Donnell'
}
```

Request response:

```
{
  "user": {
    "id": 38,
    "firstName": 'Tyler',
    "lastName": 'O\'Donnell',
    "email": "tyler@tylerodonnell.com",
    "createdAt": "2019-06-25T03:21:25.363Z",
    "updatedAt": "2019-06-25T03:21:25.363Z"
  },
  "token": "Bearer <token>"
}
```

### POST `/api/restaurants`

Search for a restaurant

Request body:

```
{
  search: 'pizza',
  location: '90210',
  price: '1',
  criteria: ['vegan']
}
```

Request response:

```
[
  {
    "name": "Upper Crust Pizzeria",
    "alias": "upper-crust-pizzeria-beverly-hills",
    "image": "https://s3-media2.fl.yelpcdn.com/bphoto/lVigixs9a7s97GSdYTn4QQ/o.jpg",
    "rating": 4.5,
    "reviewCount": 223,
    "address": [
      "243 S Beverly Dr",
      "Beverly Hills, CA 90212"
    ],
    "phone": "(310) 504-5056",
    "distance": 4494.712818437756,
    "price": "$$",
    "categories": [
      "Pizza",
      "Salad",
      "Chicken Wings"
    ]
  }
]
```

### GET `/api/preference`

Gets the logged-in user preference's

**Requires an authorization header because this route requires the user to be logged in**

```
authorization: Bearer <token>
```

Request response:

```
{
  "criteria": [
    "vegan"
  ],
  "id": 84,
  "userId": 1,
  "location": 21014,
  "price": 2,
  "createdAt": "2019-07-03T04:37:01.881Z",
  "updatedAt": "2019-07-03T04:41:08.145Z"
}
```

### POST `/api/preference`

Creates or updates the logged-in user preferences

**Requires an authorization header because this route requires the user to be logged in**

```
authorization: Bearer <token>
```

Request response:

```
{
  "criteria": [
    "vegan"
  ],
  "id": 84,
  "userId": 1,
  "location": 21014,
  "price": 2,
  "createdAt": "2019-07-03T04:37:01.881Z",
  "updatedAt": "2019-07-03T04:41:08.145Z"
}
```

## API Errors

When the API gets an error (failed validation, missing authorization header, etc) the error message with be in an `error` key

Request response:

```
{
  error: ...
}
```
