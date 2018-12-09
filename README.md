# Assesment

This assesment has been coded in NodeJs through an Express server. Others 3d party libraries used:
* [Ramda]
* [Mocha]

# Features

API methods:
  - /users : Retrieve all clients
  - /users/id/:id :  Filters clients by id
  - /users/name/:name : Filters client by name
  - /users/policies=id=<USER_ID>&client=<CLIENT_NAME> : Get all policies of a client 
  - /users/policies=id=<USER_ID>&policy=<POLICY_ID> : Retrieves the client of a policy

For example:
http://localhost:8080
http://localhost:8080/users
http://localhost:8080/users/id/a0ece5db-cd14-4f21-812f-966633e7be86
http://localhost:8080/users/name/Adele
http://localhost:8080/policies?id=a0ece5db-cd14-4f21-812f-966633e7be86&client=Manning
http://localhost:8080/policies?id=a0ece5db-cd14-4f21-812f-966633e7be86&policy=64cceef9-3a01-49ae-a23b-3761b604800b


### Installation

App requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd assesment
$ npm install
```

### Run app and tests

For start server

```sh
$ npm start
```
For run test suites 

```sh
$ npm test
```



### Todos

 - Write MORE Tests
 - Database management

License
----

MIT


[//]: # 

   [Ramda]: <https://ramdajs.com/>
   [Mocha]: <https://mochajs.org/>
  
