# Getting started

The directions below describe all steps needed to install and run the app.

Note: 
  
* The app requires NodeJS and `npm` to be installed.
    - https://nodejs.org/en/download/

* The app depends on a local installation of MongoDB.
    - https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3

## 1. Installation
Navigate into the app directory and run the following command.

```
npm install
```

## 2. Start a mongod process
Enter the following command to start the MongoDB server.

```
mongod
```

Close the terminal window after you run `mongod` and open a new terminal window to run the next commands.

## 3. Start the Node server
You can choose to start in either production or development mode. Choose from one of the following options.

#### 3.1 In development mode (recommended)
To start in development mode, enter the following command. 

`npm run start:dev`

This command builds the client bundle with `webpack --watch` and starts the node server with `nodemon` .
 
 #### 3.2 In development mode with hot module replacement (not recommended)
HMR requires a proxy, which is not configured right now. 

`npm run start:dev-server`

#### 3.3 In production mode
If you'd rather start in production mode (not necessary), enter the following command. Production mode includes caching.

`npm run build && npm run start`

## 4. Open the app in your browser
After starting the server, you should see the following output in your terminal.

```
Listening on port 8000.
MongoDB conection successful. 
```

To open the app, copy/paste `localhost:8000` into your browser's URL bar.


# API
<details closed>
<summary>
    <span style='font-size:1.6em'>/</span>
</summary>
&emsp;GET
</details>

<details closed>
<summary>
    <span style='font-size:1.6em'>/login</span>
</summary>
POST <br>
&emsp; <strong> Required: </strong> <br>
&emsp;&emsp; username=[String] <br>
&emsp;&emsp; password=[String] <br>
&emsp; <strong> Optional: </strong> <br>
&emsp;&emsp;
</details>