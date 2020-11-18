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

## User Stories
* As a user, I should be able to see a home page with SuperSmash champions, a link to see more info on specific champion and an Add to Favorites button with the title of the website and the option to log in or sign up.
* As a user, I should be able to log in or sign up to access the add to favorites button. 
* As a user, as soon as I am logged in, I should see a message saying that I am logged in with a change in the hyperlinks under the title of the webpage to say Log Out, Profile, Favorites, Messages
* As a user, I am able to access my profile page and update my username with the provided field if I choose to do so
* As a user, I am able to see my added champions' name and associated image
* As a user, I am able to submit comments on the message board and other user's comments and an associated Remove button.
* As a user, I am only able to delete my own comments on the message board

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
<img src='https://i.postimg.cc/Hxvfw2G0/ERD-for-proj-2-1.png' border='0' alt='ERD-for-proj-2-1'/>
website used: lucidchart.com

### Wireframes
<img src='https://i.postimg.cc/0N0vwD2Z/20201116-172319.jpg' border='0' alt='20201116-172319'/>
<img src='https://i.postimg.cc/k53M87NM/20201116-172309.jpg' border='0' alt='20201116-172309'/>

### API Source
This is the link to the API I chose to use for this project.
https://api.kuroganehammer.com/api/characters

### Creating Routes
| Route             | Crud  | Explanation                |
| ------------------| ------| ---------------------------|
| "/"               | READ  | Renders home page          |
| "/"               | CREATE| creates user's favorites   |
| "/smash"          | READ  | Grabs the user's favorites |
| "/smash"          | DELETE| Delete's user's favorite   |
| "/profile"        | READ  | Grabs user's current name  |
| "/profile"        | UPDATE| Update user's username     |
| "/details/:ownerid| READ  | Grabs the champion data    |
| "/comments"       | READ  | Grabs all comments made    |
| "/comments"       | DELETE| Deletes user's comment     |

## challenges
* Figuring out how to use the API to get information on a specific champion
* Figuring out how to store the userId of the comment made into the comment table
* Figuring out how to correctly use bootstrap

## Stretch Goals
* let users update passwords and their comments and letting them get a link of all the comments they made
* making the remove button on the message board only show up for the current user's comments
* understanding bootstrap more so the styling is better
* allowing users to respond to other comments they see in the message board
