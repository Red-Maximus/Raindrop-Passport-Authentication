# Raindrop-Passport-Authentication

This is a small app that uses an inbuilt passport module that performs the authentication step by making calls to the (Sandbox) Hydrogen API. This is only a basic example and is currently intended for demonstration purposes.

## Pre-requisites for Use

1) The user must have access to the Hydrogen Sandbox
2) The user must have access to the Beta Hydrogen App
3) The user must add themselves to (or modify a current option of) the user database in `auth.js` to include their Hydro ID from the Beta Hydrogen App

## Usage

1) Add a `config.js` file (with the format below) into the `app` directory. This is needed to make calls to the Hydrogen API.
    ```
    const clientId = "[Put Client ID Here]",
        clientSecret = "[Put Client Secret Here]",
        applicationId = "[Put Application ID Here]";

    module.exports = {
        CLIENT_ID: clientId,
        CLIENT_SECRET: clientSecret,
        APPLICATION_ID: applicationId
    };
    ```
2) Install the needed modules with `npm install`
3) Run the app with node. (`$ node app/app.js` from the parent directory)
4) Navigate to `localhost:3000`
5) Login as a listed user. If you want to successfully authenticate, login as a user that with a Hydro ID you have access to
6) After logging in, enter the API-generated message into the Hydro App
7) Click `verify`
8) If all previous conditions were met, the user will be redirected to a `/pass` page, otherwise they will receive the `/fail` page
