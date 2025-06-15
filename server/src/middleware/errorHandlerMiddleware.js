const errorHandler = (err, req, res, next) => {
  console.error('❌ Server Error:', err.stack || err.message);

  res.status(err.status || 500).json({
    message: 'Internal Server Error',
    error: err.message || 'Unknown error',
  });
};

module.exports = errorHandler;
