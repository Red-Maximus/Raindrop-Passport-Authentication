This is a small app that uses a built-in passport module that performs the authentication step by making calls to the (Sandbox) Hydrogen API. This is only a basic example and is currently intended for demonstration purposes only.

## Instructions

To install this app, clone the repository and install the dependencies.

```
    $ git clone git@github.com:Red-Maximus/Raindrop-Passport-Authentication.git
    $ cd Raindrop-Passport-Authentication
    $ npm install
```

Add a `config.js` file into the `Raindrop-Passport-Authentication` directory. This is needed to initialize the Hydrogen API.
```    
    const sandClientId = "[Put Sandbox Client ID Here]",
        sandClientSecret = "[Put Sandbox Client Secret Here]",
        sandApplicationId = "[Put Sandbox Application ID Here]",
        prodClientId = "[Put Production Client ID Here]",
        prodClientSecret = "[Put Production Client Secret Here]",
        prodApplicationId = "[Put Production Application ID Here]";

    module.exports = {
        Sandbox: {
            CLIENT_ID: sandClientId,
            CLIENT_SECRET: sandClientSecret,
            APPLICATION_ID: sandApplicationId
        },
        Production: {
            CLIENT_ID: prodClientId,
            CLIENT_SECRET: prodClientSecret,
            APPLICATION_ID: prodApplicationId
        }
    };
```

Add a user entry in the user database at `auth.js` that includes your Hydro ID.
```
    /* Demo Database */
    const userDB = [
        ...
        { username: '[Your Choice]', userId: [Increment], password: '[Your Choice]', hydroId: '[Your Hydro ID]' }
    ];
```