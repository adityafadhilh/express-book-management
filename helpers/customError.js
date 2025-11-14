module.exports = class CustomError extends Error {
    constructor(status = 500, message) {
        super(message);
        this.status = status;
    }
}