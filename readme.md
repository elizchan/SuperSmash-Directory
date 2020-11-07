* create a node app
* .gitignore
* install and set up express
* created home route
* created controller called auth.js
* created get and post routes for login, signup in auth.js
* installed ejs and express-ejs-layouts
* created views folder with auth folder and layouts.ejs
* created login.ejs and signup.ejs
* created login and sign up forms
* npm i sequelize pg, then initialized sequelize
* changed database name and dialect in config.json
* created db and model
* migrated model
* required db in controller

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
