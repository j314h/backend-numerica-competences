# BACK-END Numérica - Compétences

_Project created and monitored by Cécile Maillard-Salin, David Caignaert and John Haimez._

> use this branch to create new branches and work on them.
> then if the code is correct, the branch will be merged on the develop branch for the final production

- **under construction**

> [Maquette Figma](https://www.figma.com/proto/ILECZVkbsHWVSmTIbRFCEF/projet-co-maquette?node-id=547%3A5085&scaling=min-zoom)  
> [Trello](https://trello.com/b/E2KKZtPq/prod-numerica-comp%C3%A9tences)  
> [Soutenance N°1](https://prezi.com/dashboard/next/#/presentations)  
> [Documentation Front-End](https://github.com/j314h/frontend-numerica-competences/tree/developp)

# Documentation

## Install

- Installation procedure for local development

  > install [Nodejs](https://nodejs.org/en/) and follow the following instructions

  - before continuing, you must create a '.env' file, copy paste the contents of the '.env.example' file to fill the file
    - open a terminal
    - go in project 'backend-numerica-competence'
    - execute the following command `npm i`
    - execute the following command `npm start`
      > if you have encountered any errors at this time, you have executed a command incorrectly or you have placed the commands in the wrong place  
      > or your database is not started or exist  
      > for the problems of your database, contact the webmaster

## Roads

| ROADS                                     | libelle                  | settings for request                                   | type request | verified acces user | middleware                                                                 |
| ----------------------------------------- | ------------------------ | ------------------------------------------------------ | ------------ | ------------------- | -------------------------------------------------------------------------- |
| GLOBAL                                    |                          |                                                        |              |                     |                                                                            |
| ---------------------------------------   | ----------------------   | ------------------------------------------------------ | ------------ | ------------------- | ----------                                                                 |
| _Get all roles_                           | `/roles`                 | -                                                      | GET          | Connected admin     | verifUserConnect, verifUserAccesAmin                                       |
| _Get all states_                          | `/states`                | -                                                      | GET          | Connected admin     | verifUserConnect, verifUserAccesAmin                                       |
| _recover the token from the api rome_     | `/access-token-api-rome` | parameter in model APIRome.js                          | GET          | Connected referent  | verifUserConnect, verifUserAccesReferent                                   |
|                                           |                          |                                                        |              |                     |                                                                            |
|                                           |                          |                                                        |              |                     |                                                                            |
|                                           |                          |                                                        |              |                     |                                                                            |
| ---------------------------------------   | ----------------------   | ------------------------------------------------------ | ------------ | ------------------- | ----------                                                                 |
| USER                                      |                          |                                                        |              |                     |                                                                            |
| ---------------------------------------   | ----------------------   | ------------------------------------------------------ | ------------ | ------------------- | ----------                                                                 |
| _Disconnect user_                         | `/sign-out`              | -                                                      | GET          | Connected           | verifUserConnect                                                           |
| _Connect user_                            | `/sign-in`               | email, password                                        | POST         | -                   | -                                                                          |
| _Create user (no connection to creation)_ | `/sign-up`               | firstName, lastName, email, role is required           | POST         | Connected, admin    | verifUserConnect, verifUserAccesReferent, createUserHigtLevel              |
| _Get user with id_                        | `/user/:id`              | \_id => user                                           | GET          | Connected, admin    | verifUserConnect, verifUserAccesReferent,                                  |
| _Delete user_                             | `/user/:id`              | \_id => user                                           | Delete       | Connected, admin    | verifUserConnect, verifUserAccesAmin                                       |
| _Update state this user_                  | `/changestate-user`      | idUser, idState                                        | Patch        | Connected, admin    | verifUserConnect, verifUserAccesAmin, changeStateHigtLevelForUserHigtLevel |
| _Update role this user_                   | `/changerole-user`       | idUser, idRole                                         | Patch        | Connected, admin    | verifUserConnect, verifUserAccesAmin, createUserHigtLevel                  |
|                                           |                          |                                                        |              |                     |                                                                            |
|                                           |                          |                                                        |              |                     |                                                                            |
|                                           |                          |                                                        |              |                     |                                                                            |
| ---------------------------------------   | ----------------------   | ------------------------------------------------------ | ------------ | ------------------- | ----------                                                                 |
| UPLOAD                                    |                          |                                                        |              |                     |                                                                            |
| ---------------------------------------   | ----------------------   | ------------------------------------------------------ | ------------ | ------------------- | ----------                                                                 |
| _upload img log numerica_                 | `/file/logo-numerica`    | FormData with clef "logoNumerica"                      | POST         | Connected, admin    | verifUserRoot ,verifUserConnect                                            |
| _get all files img_                       | `/files-i`               | -                                                      | GET          | connected           | verifUserConnect                                                           |
|                                           |                          |                                                        |              |                     |                                                                            |

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

- in road /sign-up => user is create but not validate, email for verification send at user for config password.
