import { useState } from "react";

function Login() {
    //1st Step --> const [email, setEmail] = useState("");
    //1st Step --> const [password, setPassword] = useState("");
    const initialState = {
        email: "",
        password: "",
    };
    const [formData, setFormData] = useState(initialState);
    function handleSubmit(e) {
        e.preventDefault();
        if (!formData.email && !formData.password) return;
        console.log(formData);
        setFormData(initialState);
        //1st Step --> const newObj = {
        //     email,
        //     password,
        // };
        // setEmail("");
        // setPassword("");
    }
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <h2>Login </h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        //2nd Step --> onChange={(e) =>
                        //     setFormData({ ...formData, email: e.target.value })
                        // }
                        //1st Step --> value={email}
                        //1st Step --> onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        // onChange={(e) =>
                        //     setFormData({
                        //         ...formData,
                        //         password: e.target.value,
                        //     })
                        // }
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">submit</button>
            </form>
        </div>
    );
}

export default Login;

// 1st step --> through single state variable , each state for each fiels
// 2nd Step -->
