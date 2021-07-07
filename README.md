# SellMate

An E-commerce site designed for pet buy-sell and maintenance.

# Screenshot

<img src="SellMate/images/Shop.png">

# Features

- Browse for your desired pets.
- Can filter by category & price
- Place orders
- Make payment
- Users can blog about their pets.

# Tools

- MongoDB
- Express.js
- React.js

### Running locally

Frontend

```
cd front-sellmate
npm run start
```

Backend

```
cd SellMate
npm run start
```

### Deploying to heroku

Frontend

```
heroku git:remote -a $FRONTEND_APP_NAME -r heroku-frontend
heroku config:set -a $FRONTEND_APP_NAME $(cat $FRONTEND_ENV_FILE)
git subtree push --prefix front-sellmate/ heroku-frontend main
```

Backend

```
heroku git:remote -a $BACKEND_APP_NAME -r heroku-backend
heroku config:set -a $BACKEND_APP_NAME $(cat $BACKEND_ENV_FILE)
git subtree push --prefix SellMate/ heroku-backend main
```
