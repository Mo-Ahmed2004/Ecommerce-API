const globalError = (err , req , res , next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
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
    return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}

export default globalError;
