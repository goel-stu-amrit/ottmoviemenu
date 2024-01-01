exports.sendResponse = (response, status, message, data = null) => {
  return response.status(status).json({message, status, data});
};
