class CustomResponse {
    constructor(status, message, data) {
        this.status = status;
        this.message = message || "success";
        this.data = data;
        this.success = status < 400 ? true : false;
        this.length = data.length;
    }
}

export { CustomResponse };
