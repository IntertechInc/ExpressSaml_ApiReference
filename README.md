# ExpressSaml_ApiReference


This exists as a reference for api best practices using express and SAML token authentication

## Usage

1. Fill out the values in `default.json` or create a `local.json` file in the `config` directory
1. The usual:
```
$ npm install
$ gulp
```

### Api testing

1. Get SAML Token from your adfs server.
1. `POST` Token to /token/saml to retrieve api authorization token as encoded as `application/x-www-form-urlencoded` under the value of `token`
1. `GET` /me with authorization token set in step 2 set as a `bearer` authorization header and `Accept` set to your api version

#### Optional

1. Set the `If-None-Match` header of the `GET` on /me to the returned `ETag` to see a `304 Not Modified` response to save on traffic
