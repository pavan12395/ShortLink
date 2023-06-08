const AUTH_SERVER_ROUTE = '/auth'
const URL_SERVER_ROUTE = "/file"
const DOWNLOAD_SERVER_ROUTE = "/downloads"
const FILE_SERVER_ROUTE = "/"
const SIGNUP_ROUTE = '/signup'
const LOGIN_ROUTE = "/login"
const HELLO_ROUTE = "/hello"
const HELLO_MESSAGE = "Hello Endpoint!";
const USERNAME_TAKEN_MESSAGE = "Username already Taken!";
const SUCCESSFUL_CREATE_USER =  "Successfully Created the User";
const SUCCESSFUL_LOGIN_USER = "Successfully Logged In";
const INCORRECT_USERNAME_OR_PASSWORD ="Incorrect name or password";
const ERR_DB = "Error connecting to Database"
const OK_DB = "Successfully connected to the DB"
const ERROR = "error"
const OPEN = "open"
const DOWNLOAD_ROUTE = "/:hash"
const FILE_NOT_FOUND = "File Not found!";
const UPLOADS_DIR = "uploads";
const CONTENT_DIPOSITION = "Content-Disposition"
const CONTENT_TYPE = "Content-Type";
const OCTET_STREAM = "application/octet-stream";
const PARAM_MISSING = "Param Missing!";
const ERROR_FETCHING_FILE = "Error in Fetching file! ";
const AUTHORIZATION = "authorization";
const FILE = "file";
const UTF8 = "utf8";
const SUCCESSFULL_FILE_UPLOAD = "Successfully uploaded file";
const ERROR_STORING_FILE = "Error Storing file";
const DELETE_FILE_ROUTE = "/:file"
const SUCCESSFUL_FILE_DELETE = "";
const LIST_FILES_ROUTE = "/listfiles";
const FETCH_SUCCESSFUL = "Fetched Successfully!";
const ERROR_FETCH_FILE = "Error Fetching files!";
const INVALID_TOKEN = "Invalid Token!";
const UPLOAD_URL_ROUTE = "/" 
const NO_USER_EXIST = "No User exists with the given name";


module.exports = {AUTH_SERVER_ROUTE,URL_SERVER_ROUTE,DOWNLOAD_SERVER_ROUTE,FILE_SERVER_ROUTE,SIGNUP_ROUTE,LOGIN_ROUTE,
HELLO_ROUTE,HELLO_MESSAGE,USERNAME_TAKEN_MESSAGE,SUCCESSFUL_CREATE_USER,SUCCESSFUL_LOGIN_USER,
INCORRECT_USERNAME_OR_PASSWORD,ERR_DB,OK_DB,ERROR,OPEN,DOWNLOAD_ROUTE,FILE_NOT_FOUND,UPLOADS_DIR,CONTENT_DIPOSITION,CONTENT_TYPE,
OCTET_STREAM,PARAM_MISSING,ERROR_FETCHING_FILE,
AUTHORIZATION,FILE,UTF8,SUCCESSFULL_FILE_UPLOAD,ERROR_STORING_FILE,DELETE_FILE_ROUTE,SUCCESSFUL_FILE_DELETE,LIST_FILES_ROUTE
,FETCH_SUCCESSFUL,ERROR_FETCH_FILE,INVALID_TOKEN,UPLOAD_URL_ROUTE,NO_USER_EXIST};
