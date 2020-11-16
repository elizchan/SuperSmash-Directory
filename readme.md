# SuperSmash Directory
## Concept
A directory consisting of available SuperSmash characters in SuperSmash 4 that you can add to your account and allows you to post messages/comments to the message board for other users to see.

## Techonologies Used:
* Bootstrap
* Node.js
* Postgres SQL
* Express
* EJS
* SuperSmash API

## How to set up:
1. fork and clone

2. install dependencies
```
npm i
```

3. create a `config.json` with the following code:
```json
{
  "development": {
    "database": "<insert development db name here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "database": "<insert test name here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "database": "<insert production name here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

**Note:** If your database requires a username and password, you'll need to include these as well.

4. create database
```
sequelize db:create <insert db name here>
```
5. migrate the `user` model to database
```
sequelize db:migrate
```
6. Add `SESSION_SECRET` and `PORT` environment variables in a `.env` file(can be any string)

7. Run `nodemon` to start up app

## Planning/Creation Process
### ERD
### Wireframes
<img src="https://i.ibb.co/ZNDZ8g0/20201106-200710.jpg" alt="20201106-200710" border="0">
<img src="https://i.ibb.co/nr6T45p/20201106-200814.jpg" alt="20201106-200814" border="0">

## challenges
* Figuring out how to use the API to get information on a specific champion
* Figuring out how to store the username from the comment form to the comments table

## Stretch Goals
* let users update passwords and their comments and letting them get a link of all the comments they made
* only allowing users to delete their own comments on the message board
