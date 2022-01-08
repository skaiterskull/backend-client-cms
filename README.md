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

| #   | API          | METHOD | DESCRIPTION                                                               |
| --- | ------------ | ------ | ------------------------------------------------------------------------- |
| 1   | `/:category` | GET    | Expect the category slug as params to fetch all product in that category  |
| 2   | `/get/:slug` | GET    | Expect a product slug as params to fetch single product based on the slug |

### User API

All user api will follow the following endpoint `${rootUrl/api/v2/user}`

| #   | API                   | METHOD | DESCRIPTION                                                                                           |
| --- | --------------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| 1   | `/`                   | POST   | Expect a userInfo object and save it in database                                                      |
| 2   | `/email-verification` | POST   | Expect pin and email as an object to verify the account                                               |
| 3   | `/login`              | POST   | Expect the email and password as an object for log in purpose                                         |
| 4   | `/`                   | GET    | Expect accessJWT token as header authorization and return an user info linked to the accessJWT token. |
| 5   | `/:email`             | GET    | Expect email as params and find the user based on that.                                               |
| 6   | `/`                   | PUT    | Expect email, opt, new password as an object for update password purpose.                             |

### Session API

All user api will follow the following endpoint `${rootUrl/api/v2/session}`

| #   | API | METHOD | DESCRIPTION                                                              |
| --- | --- | ------ | ------------------------------------------------------------------------ |
| 1   | `/` | GET    | Expect refresh JWT as header authorization and return a new access token |

### Payment Options API

All user api will follow the following endpoint `${rootUrl/api/v2/paymentOpt}`

| #   | API | METHOD | DESCRIPTION                                                                                        |
| --- | --- | ------ | -------------------------------------------------------------------------------------------------- |
| 1   | `/` | GET    | Fetching all the data from payment options table, this is private api, auhtorization header needed |

### Order API

All user api will follow the following endpoint `${rootUrl/api/v2/order}`

| #   | API       | METHOD | DESCRIPTION                                                                        |
| --- | --------- | ------ | ---------------------------------------------------------------------------------- |
| 1   | `/`       | POST   | Expects a huge object of the information related to order and save it to database. |
| 2   | `/:email` | GET    | Expects an email and returning the orders related to the email                     |
