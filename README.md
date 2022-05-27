# Album Viewer
A simple React application that shows the result of RESTful Api calls.
The backend side was written with Node. For the frontend side was used React.


## Live Application URL

The Application is deployed in https://album-viewer.herokuapp.com/

Click on the link to see the application


## Prerequisites

### Install Node JS
Refer to https://nodejs.org/en/ to install nodejs

### Install create-react-app
Install create-react-app npm package globally. This will help to easily run the project and also build the source files easily. Use the following command to install create-react-app

```bash
npm install -g create-react-app
```


## Cloning and Running the Application in local

Clone the project into local

Install all the npm packages. Go into the project folder and type the following command to install all npm packages

```bash
npm install
cd client && npm install
```

In order to run the server backend application Type the following command

```bash
npm start
```

In order to run the client frontend application Type the following command

```bash
cd client && npm start
```

The Backend Runs on **localhost:3001**
The Frontend Runs on **localhost:3000**


## API

-The implemented API are:

**'/albums'**
Return all full albums (with their photos)

**'/albumsfiltered'**
Return the full albums of a selected user (with their photos)

**'/users'**
Return all users id and an All option


-The calls results are retrived from the following urls:

https://jsonplaceholder.typicode.com/albums

https://jsonplaceholder.typicode.com/photos


## Testing API

From the root of the project execute the following command to start server

```bash
npm start
```

For test all API run:

```bash
mocha
```


## Application design

#### Components

**Material UI** Component : (https://mui.com/material-ui/)
 

#### HTTP client

**axios** library is used to make HTTP Calls


## Documentation

https://app.swaggerhub.com/apis-docs/albste95/album-viewer/1.0.0
