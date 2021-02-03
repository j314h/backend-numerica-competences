# Documentation

## Install

- Installation procedure for local development

  > install [Nodejs](https://nodejs.org/en/) and follow the following instructions

  - before continuing you must create a '.env' file, copy paste the contents of the '.env.example' file to fill the file
    - open a terminal
    - go in project 'backend-numerica-competence'
    - execute the following command `npm i`
    - execute the following command `npm start`
      > if you have encountered any errors at this time, you have executed a command incorrectly or you have placed the commands in the wrong place  
      > or your database is not started or exist  
      > for the problems of your database, contact the webmaster

## Roads

| ROADS                             | libelle                                 | settings for request                                 | type request |
| --------------------------------- | --------------------------------------- | ---------------------------------------------------- | ------------ |
| _userRouter_                      |                                         |                                                      |              |
| `/user/:id`                       | get user                                | `_id:` `string`of user in url                        | GET          |
| `/user-create `                   | create user                             | `data:` `object` with info form create company       | POST         |
| `/confirme-account`               | validate account                        | `password:` `string ` password user                  | POST         |
|                                   |                                         | `dataCryptedFormatUrl:` `string` key crypted         |              |
| `/user-update`                    | update user                             | `oldPassword:` `string` old password user            | POST         |
|                                   |                                         | `password:` `string` new password user               |              |
|                                   |                                         | `_id:` `string` id of user update                    |              |
|                                   |                                         | `data:` `object` with info update user               |              |
| `/user-delete/:id`                | delete user                             | `_id:` `string` of user in url                       | DELETE       |
|                                   |                                         |                                                      |              |
| _uploadRouter_                    |                                         |                                                      |              |
| `/files-i`                        | get files                               | -                                                    | GET          |
| `/file/logo-numerica`             | update logo numerica                    | `data:` `FormData` file logo numerica                | POST         |
| `/file/logo-identifiant`          | update logo identifiant                 | `data:` `FormData` file logo identifiant             | POST         |
| `/file/logo-menu`                 | update logo menu                        | `data:` `FormData` file logo menu                    | POST         |
| `/file/logo-numerica-footer`      | update logo numerica footer             | `data:` `FormData` file logo numerica footer         | POST         |
| `/file/logo-update-element`       | update logo update element              | `data:` `FormData` file logo update element          | POST         |
| `/file/logo-close-update-element` | update logo close update element        | `data:` `FormData` file logo close update element    | POST         |
|                                   |                                         |                                                      |              |
| _themeColorRouter_                |                                         |                                                      |              |
| `/themes-colors`                  | get themes colors                       | - no active                                          | GET          |
| `/cu-theme-color`                 | active or not dark mode                 | `name:` `string` name of theme color                 | POST         |
|                                   |                                         |                                                      |              |
| _stateRouter_                     |                                         |                                                      |              |
| `/states`                         | get states                              | -                                                    | GET          |
|                                   |                                         |                                                      |              |
| _sectorRouter_                    |                                         |                                                      |              |
| `/sectors/:id`                    | get sector of company                   | `_id:` `string` of company in url                    | GET          |
|                                   |                                         |                                                      |              |
| _roleRouter_                      |                                         |                                                      |              |
| `/roles`                          | get roles                               | -                                                    | GET          |
|                                   |                                         |                                                      |              |
| _companiesRouter_                 |                                         |                                                      |              |
| `/companies-admin`                | get companies of user connected (admin) | - (use `req.user.id` for selected companies)         | GET          |
| `/company/:id`                    | get company                             | `_id:` `string` of company in url                    | GET          |
| `/company-create`                 | create company                          | `company:` `object` with info company                | POST         |
|                                   |                                         | `sectors:` `array of string` with sectors of company |              |
| `/company-update`                 | update company                          | `data:` `object` with info company                   | POST         |
| `company/:id`                     | delete company                          | `_id:` of company in url                             | DELETE       |
|                                   |                                         |                                                      |              |
| _authRouter_                      |                                         |                                                      |              |
| `/sign-in`                        | connect user                            | `email:` `string` of user connect                    | POST         |
|                                   |                                         | `password:` `string` of user connect                 |              |
| `/sign-out`                       | disconnect user                         | - (delete jwt of user)                               | GET          |
| `/access-token-api-rome`          | access of api rome work                 | - (info connect in api)                              | GET          |
| `/verification-connect`           | verification user connected             | - (info of user in req)                              | GET          |
|                                   |                                         |                                                      |              |

## Features

| FEATURE                                | location       | description                                                                      |
| -------------------------------------- | -------------- | -------------------------------------------------------------------------------- |
| `verifUserConnect`                     | verify.conf.js | verifies that the user is logged in and known                                    |
| `verifUserAccesAmin`                   | verify.conf.js | check the role, it must be minimum to administrator                              |
| `verifUserAccesReferent`               | verify.conf.js | check the role, it must be minimum to referent                                   |
| `createUserHigtLevel`                  | verify.conf.js | prohibits the creation of high level user, if the logged in user is low level    |
| `changeStateHigtLevelForUserHigtLevel` | verify.conf.js | prohibits the change of high level user role, if the logged in user is low level |
| `createJwtToken`                       | jwt.conf.js    | create token                                                                     |
| `checkExpiredToken`                    | jwt.conf.js    | refresh token                                                                    |
| `extractUserFromToken`                 | jwt.conf.js    | extracts the user once the token is assigned                                     |
| `addJwtFeatures`                       | jwt.conf.js    | create feature for jwt                                                           |
| `error`                                | error.conf.js  | get the errors on the routes, and send the error back to the front               |
| `upload`                               | multer.js      | instance multer for upload file                                                  |
|                                        |                |                                                                                  |

### NOTES

- in road /sign-up => user is create but not validate email for verification send at user for config password.
