# Django-React-base-connection

A Django backend and React frontend, with custom user table and connection routes


## For the backend part

```bash
cd backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
```

### Set up your configuration

We will need to create applications. Go there (http://localhost:8000/admin/oauth2_provider/application/) and create an app.
You will use it for 4 different purposes, but you can use the same one everytime if you want.
Check 'Confidential' and 'Resource owner password-based' and add a user (your superuser).

## For the frontend part

```bash
cd frontend
npm install
```

### Set up your configuration

You will have to use the client_id and client_secret created in your applications as above. You need to change these files : 
- frontend\src\components\auth\login.js line 78-79
- frontend\src\components\auth\logout.js line 11-12
- frontend\src\components\axios\facebookLogin.js line 9-11
- frontend\src\components\axios\googleLogin.js line 9-11

### API documentation

When the server is running, you can check the route **/api/doc/schema/ui/** in order to get information about the available endpoints.

## Create the Facebook and Google App

You need two keys (id and secret) by creating two apps in Facebook (https://developers.facebook.com/apps/) and Google (https://console.cloud.google.com/apis/credentials). Create a .env file next to manage.py and create the variable SECRET_KEY, SOCIAL_AUTH_FACEBOOK_KEY, SOCIAL_AUTH_FACEBOOK_SECRET, SOCIAL_AUTH_GOOGLE_OAUTH2_KEY, SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET with these values (SECRET_KEY is a random key for your django project). Similarly, in the frontend directory, create .env and specify REACT_APP_GOOGLE_CLIENT_ID and REACT_APP_FACEBOOK_CLIENT_ID.

## Project description

- The home page simply display and update your information when you are connected.
- You have the register page to create a new user.
- The login page handle user created via the register page or Google and Facebook (if you have done the previous steps).
- The logout page is a simple button that will disconnect you and redirect you to the login page.

## Run the project

```bash
cd backend 
python manage.py runserver
```

```bash
cd frontend 
npm start
```