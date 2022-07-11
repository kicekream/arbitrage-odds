class Response {
  
    static error(res, status, message, data) {
      return res.status(status).json({
        message: message ||"An Error occured, try again",
        data
      });
    }
  
    static server(res) {
      return res.status(500).json({
        status: 'error',
        message: 'Server Error'
      });
    }
  
    static success(res, status, message, data) {
      return res.status(status).json({
        status: 'success',
        message,
        data
      });
    }
  
    static session(res, status, message, token, user) {
      return res.status(status).json({
        status: 'success',
        message,
        data: {
          authenticated: true,
          token,
          user
        }
      });
    }
  }
  
  module.exports = { Response };