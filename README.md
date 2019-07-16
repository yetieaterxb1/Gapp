# Getting started (DEPRECATED)

The directions below describe all steps needed to install and run the app.

Note: 
  
1. The app requires NodeJS and `npm` to be installed.
    * https://nodejs.org/en/download/

2. The app depends on a local installation of MongoDB.
    * https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3

## 1. Installation
### 1.1 Clone the repository
First, clone the repository from github using the `git` command line interface.

```
git clone https://github.com/<some_user>/<some_repository>
```

Alternatively, if you don't have `git`, you can use the green "Clone or Download" button in the upper right hand corner of the repository and click "Download ZIP" 
![](https://www.stevejgordon.co.uk/wp-content/uploads/2018/01/CloneOrDownloadGitHub.png)

### 1.2 Install Node packages
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
Now you are ready to start the web server.
You can choose to start in either production or development mode.

#### 3.1 In development mode
To start in development mode (recommended), enter the following command. 

`nodemon`

Nodemon will restart the server when it detects changes to app files. This way, you don't have to restart the server by hand to see your changes. 

#### 3.2 In production mode
If you'd rather start in production mode (not necessary), enter the following command.

`npm run build && npm run start`

## 4. Open the app in your browser
After starting the server, you should see the following output in your terminal.

```
Listening on port 8000.
MongoDB conection successful. 
```

To open the app, simply copy/paste `localhost:8000` into your browser's URL bar.
