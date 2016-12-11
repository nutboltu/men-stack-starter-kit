# MEN (Mongodb, Express, Node) Stack Starter Kit

This repository is the REST API Starter kit

## Requirement

* Node
* Express Framework
* MongoDB (Mongoose)

## Installation

Clone the repository:

```
git clone https://github.com/NutBoltu/men-stack-starter-kit.git
cd men-stack-starter-kit
rm -rf .git
```

Install mongodb globally : [Official documentation](https://docs.mongodb.com/manual/installation)


Install dependencies using npm:

```
npm install
```

### For development
```
npm run dev
```
The app will run in http://localhost:3000

### For Production
```
npm start
```

### Starter Kit layout

```
+- config
|   +- index.js               --> configuration file where database configuration and
|                                 host configuration are described
+- controllers                --> controller files
+- models                     --> models directories that communicate with the database
|   +- definitions            --> database models are defined
|   +- schemas                --> mongodb schemas are described
|   +- handlers               --> database access layer that connects with the db models
|   +- db.connection.js       --> connect with mongodb
|   +- models.js              --> initialize mongodb models
+- node_modules               --> development dependencies node modules
+- routes                     --> REST api routers
+- utilities                  --> utilities files
|   +- helpers                --> all helper files
|   +- validators             --> api validators are described
+- server.js                  --> application run file
+- package.json               --> node package configuration file
```

## Licence
MIT licence