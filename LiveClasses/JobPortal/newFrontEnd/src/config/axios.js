import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:5000",
});

/**
 *
 * axios.get("/users")
 * axios.post("/posts")
 *
 */
