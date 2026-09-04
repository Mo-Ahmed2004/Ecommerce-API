import ApiError from "../utils/apiError.js";

//auth error customization
const handleJwtExpired = () => 
  new ApiError("Expired token, please log in again", 401);

const handleJwtInvalidSignature = () => 
  new ApiError("Invalid token, please log in again", 401);

const globalError = (err , req , res , next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (err.name === "TokenExpiredError") err = handleJwtExpired();
    if (err.name === "JsonWebTokenError") err = handleJwtInvalidSignature();

    if(process.env.NODE_ENV === "development") {
        sendToDev(err , res);
    }
    else {
        sendToProd(err , res);
    }
}

function sendToDev (err , res)  {
    return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
}


function  sendToProd (err , res)  {
    if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      });
    }

    //handling non operational errors
    console.error("ERROR ", err);
    return res.status(500).json({
    status: "error",
    message: "Something went wrong on our end!",
  });
}

export default globalError;
