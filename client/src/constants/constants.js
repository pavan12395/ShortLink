export const HOST_PATH = "http://52.201.232.145:5000/";
export const UPLOAD_FILE_ROUTE = HOST_PATH+"file";
export const DOWNLOAD_FILE_ROUTE = HOST_PATH+"downloads/";
export const BEARER = "Bearer "
export const ACCESS_TOKEN = "accessToken";
export const AUTHORIZATION = "Authorization";
export const CONTENT_TYPE = "Content-Type";
export const OCTET_STREAM = "application/octet-stream";
export const GET = 'GET';
export const BLOB = 'BLOB';
export const DOWNLOAD = 'download';
export const DELETE_FILE_ROUTE = HOST_PATH+"file/";
export const NOT_AUTH_MESSAGE = "Forbidden Page : User is Not Auhthenticated!";
export const ACCESS_MESSAGE = "Access the link at localhost:5000/";
export const LIST_FILES_ROUTE = HOST_PATH+"file/listfiles";
export const LOGIN_ROUTE = HOST_PATH+'auth/login';
export const DASHBOARD_HREF = "/dashboard";
export const SIGNUP_ROUTE = HOST_PATH+'auth/signup';
export const POST_SUCCESS_STATUS_CODE = 201;
export const GET_SUCCESS_STATUS_CODE = 200;
export const SIGNUP_HREF = "/";
export const LOGIN_HREF = "/login";
export async function validateCredentials(name,password)
{
    if(name.length==0)
    {
        throw new Error("UserName entered is Empty!");
    }
    else if(password.length==0)
    {
        throw new Error("Password entered in Empty!");
    }
    else if(password.length<=3)
    {
        throw new Error("Enter a Password of minimum size 4");
    }
}
