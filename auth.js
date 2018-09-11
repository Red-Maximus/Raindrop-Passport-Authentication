/*
* This module exists to make the raindrop, raindrop calls, and the user database accessible globally
* */

const passport = require('passport'),
    RaindropStrategy = require('passport-raindrop'),
    config = require('./config.js'),
    environments = ['Sandbox', 'Production'];

/* Demo Database */
const userDB = [
    { username: 'Allen', userId: 1, password: 'hello123', hydroId: 'ftpom26' },
    { username: 'Barry', userId: 2, password: 'funtimes', hydroId: 'f2oxxeb' },
    { username: 'Charlie', userId: 3, password: 'another1', hydroId: 'clc2s3e' }
];

/**
 * `HydrogenAPI` constructor
 *
 * @constructor
 * @param {String} env
 * @access public
 */
function HydrogenAPI(env) {
    let api = this;

    api.environment = checkEnv(env);

    // Declare raindrop for use for client calls
    api.raindrop = initializeRaindrop(api.environment);
}

/**
 * Toggle the environment between 'Sandbox' and 'Production'
 *
 * @access protected
 */
HydrogenAPI.prototype.switchEnv = function(env) {
    let api = this;

    if(api.environment !== env) {
        // Swap the environment
        api.environment = checkEnv(environments.find(env => env !== api.environment));

        // Initialize a new raindrop for the toggled environment
        api.raindrop = initializeRaindrop(api.environment);
    }
};

function initializeRaindrop(env) {
    let drop = new RaindropStrategy({
        environment: env,
        clientId: config[env].CLIENT_ID,
        clientSecret: config[env].CLIENT_SECRET,
        applicationId: config[env].APPLICATION_ID
    }, function (authUser, done) {
        // This verifies the user and returns it to the authentication
        let user = userDB.find(usr => usr.hydroId === authUser.hydroId);
        return user ? done(null, user) : done(new Error('User not found.'), null);
    });

    // Pass the strategy into passport
    passport.use(drop);

    passport.serializeUser(function (user, done) {
        done(null, user.userId);
    });

    passport.deserializeUser(function (id, done) {
        let user = userDB.find(u => u.userId === id);
        done(user ? null : new Error('User not found'), user);
    });

    return drop;
}

/**
 * Verify the environment passed is valid. If invalid, default to 'Sandbox'
 *
 * @access private
 */
function checkEnv(env) {
    return environments.includes(env) ? env : environments[0];
}

/**
 * Return the passport module with the current strategy
 *
 * @access public
 */
function getPassport() {
    return passport;
}

module.exports = {
    HydrogenAPI: new HydrogenAPI(environments[0]),
    passport: getPassport,
    userDB: userDB,
    environments: environments
};