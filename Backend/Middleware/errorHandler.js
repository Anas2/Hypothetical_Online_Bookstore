

const errorHandler = (error, req, res, next) => {

    let status = 500;
    let data = {
        message: "Internal server error",
        success: false
    }

    if (error.status) {
        status = error.status
    }
    if (error.message) {
        data.message = error.message
    }
    if (error.success) {
        data.success = error.success
    }
    return res.status(status).json(data)

}

module.exports = errorHandler;