const errorHandlerMiddleware = (err, req, res, next) => {
  console.log('Error from error-handler: ', err);
  return res.status(500).json({
    msg: 'Something went wrong please try again...',
  });
};

module.exports = errorHandlerMiddleware;
