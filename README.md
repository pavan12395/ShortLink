# ShortLink Application

ShortLink is a URL shortening application similar to TinyURL. It allows users to create shortened links for long URLs, making them easier to share and remember. This project consists of a front-end implemented using React and a back-end using NodeJS and MongoDB as the database. The communication between the front-end and back-end is done via HTTP protocol.

## Features

- User Authentication: The server uses JWT (JSON Web Tokens) for user authentication and authorization. Users can sign up and log in to the application.
- Password Encryption: The server encrypts user passwords using the bcrypt library, ensuring secure storage of user credentials.
- URL Shortening: The application provides a route for shortening long URLs. Users can input a long URL, and the server will generate a shortened URL that redirects to the original long URL.
- File Upload: The server includes functionality for uploading files. Files are associated with the user who uploaded them and are stored in the `/uploads` directory of the Node application.
- File Deletion: Users can delete files they have uploaded using the provided route.
- File Serving: The server serves files to users. By accessing the appropriate route, users can retrieve the file associated with a specific file hash.
- File Download: The application supports file downloads. Users can initiate a file download by accessing the corresponding route.

## Server Components and Routes

### AuthServer

- POST `/auth/signup`: Registers a new user by accepting a username and password. Returns a JWT token upon successful signup.
- POST `/auth/login`: Logs in a user by accepting a username and password. Returns a JWT token upon successful login.

### UrlServer

- POST `/file`: Uploads a file under the username passed as a token in the Authorization header. Returns a ShortLink that can be used to access the file.
- DELETE `/file/:file`: Deletes the specified file.

### FileServer

- GET `/:fileHash`: Serves the file associated with the provided file hash.

### DownloadServer

- GET `/downloads/:fileHash`: Sends the associated file to the client for download.

## Mongoose Models

The Node application utilizes the following Mongoose models:

### User

- name: String (username of the user)
- password: String (encrypted password of the user)

### File

- name: String (name of the file)
- fileHash: String (unique hash representing the file)
- createdAt: Date (timestamp of the file's creation)

## Configuration

The Node application reads certain entities from the `.env` file. The following configurations can be customized:

- `MONGOOSE_CONNECTION_STRING`: MongoDB connection string. Specify the connection URI for your MongoDB database. If you don't have MongoDB on your local machine, you can start a Docker container of MongoDB and include the connection URI in the `.env` file.
- `ACCESS_TOKEN_SECRET_KEY`: Secret key used for JWT token generation and verification.
- `DEFAULT_EXPIRY`: Default expiration time (in minutes) for uploaded files (default: 5)
- `DEFAULT_INTERVAL`: Default interval (in minutes) for the cleanFiles job to run (default: 30)
- `ALLOWED_EXTENSIONS`: Comma-separated list of allowed file extensions (default: txt,lam,json,py,java,c,js,tsx,jsx,go,html,css)
- `MAX_SIZE`: Maximum size (in bytes) for uploaded files (default: 5000000)

## Running the Application

To run the application locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Set up the MongoDB database and configure the connection in `.env`.
4. Customize the configuration parameters in `.env` if desired.
5. Start the application: `npm start`
6. Access the application in your browser at `http://localhost:3000`

## CleanFiles Job

The back-end server includes a job named `cleanFiles` that

 runs at regular intervals to clean up files based on their `createdAt` timestamp. The job ensures that expired files are removed from the system, freeing up storage space.

## Dependencies

The application relies on the following dependencies:

- React: Front-end framework for building user interfaces
- MongoDB: NoSQL database for data storage
- Express: Web application framework for the Node.js server
- bcrypt: Library for password encryption
- JWT: JSON Web Tokens for user authentication
- Mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js

Please ensure that these dependencies are properly installed before running the application.

## LocalSetup Guide

set up the application on your local machine, follow these steps:

1. Clone the repository:
   git clone <repository-url>

2. Start the frontend application by navigating to the `client` directory and running the following command:
   cd client
   npm start

3. Start the backend application by navigating to the `server` directory and running the following command:
   cd server
   npm start

4. If you have MongoDB installed on your local machine, mention the connection URI in the `/server/.env` file. Otherwise, start a Docker container of MongoDB and include the connection URI in the `.env` file.


## QuickStart Guide

1. Execute the docker-compose.yaml file and find that three services(frontend,backend,monogodb) are running by the following command
         `docker compose up`
2. Access frontend at localhost:3000
3. Access Backend at localhost:5000


## Access the hosted application at http://52.201.232.145:3000/



