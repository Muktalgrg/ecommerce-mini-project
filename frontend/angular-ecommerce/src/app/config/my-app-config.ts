export default {

    oidc:{
        clientId: '0oa40ipw8iP6hMFj55d7', // public identifier of the client app
        issuer: 'https://dev-11684436.okta.com/oauth2/default', // token issuer
        redirectUri: 'http://localhost:4200/login/callback', // where user will be sent after login
        scopes: ['openid', 'profile', 'email'] // scopes provide access to information about a user
    }

}
