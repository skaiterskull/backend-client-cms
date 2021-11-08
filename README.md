# API-CLIENT-ESHOP

This is part of eshop system. This project is the backend api for client cms.

## HOW TO RUN

- Clone the project
- Run `npm install`
- Run `npm i nodemon` if you dont have nodemon installed in your system
- Run `npm run dev`

## APIS

All the api will follow the following path `${rootUrl/api/v2}` ie. http://localhost

### Category API

All category api will follow the following endpoint `${rootUrl/api/v2/category}`

| #   | API | METHOD | DESCRIPTION                               |
| --- | --- | ------ | ----------------------------------------- |
| 1   | `/` | GET    | Fetching all the data from category table |

### Product API

All product api will follow the following endpoint `${rootUrl/api/v2/product}`

| #   | API          | METHOD | DESCRIPTION                                                          |
| --- | ------------ | ------ | -------------------------------------------------------------------- |
| 1   | `/:category` | GET    | Fetching all the data from product table based on parent category ID |
| 2   | `/get/:slug` | GET    | Fetching single product from product table based on product slug     |

### User API

All user api will follow the following endpoint `${rootUrl/api/v2/user}`

| #   | API                   | METHOD | DESCRIPTION                                                  |
| --- | --------------------- | ------ | ------------------------------------------------------------ |
| 1   | `/`                   | POST   | Adding new user to database as user                          |
| 2   | `/email-verification` | POST   | Check the pin and email                                      |
| 3   | `/login`              | POST   | Check the email and password for login purpose               |
| 4   | `/`                   | GET    | Expect token as header authorizarion, return user info       |
| 5   | `/:email`             | GET    | Find user by email                                           |
| 6   | `/`                   | PUT    | Expect email, opt, new password for update password purpose. |

### Session API

All user api will follow the following endpoint `${rootUrl/api/v2/session}`

| #   | API | METHOD | DESCRIPTION                                                              |
| --- | --- | ------ | ------------------------------------------------------------------------ |
| 1   | `/` | GET    | Expect refresh JWT as header authorization and return a new access token |
