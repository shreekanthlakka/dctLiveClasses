import React, { useEffect, useReducer } from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const initialState = {
    posts: [],
    isLoading: false,
    error: null,
    selectedId: null,
};

function reducer(state, action) {
    switch (action.type) {
        case "START":
            return { ...state, isLoading: true, error: {} };
        case "ERROR":
            return { ...state, isLoading: false, error: action.payload };
        case "POSTS_FETCHED":
            return { ...state, isLoading: false, posts: action.payload };
        case "default":
            return state;
    }
}

function App() {
    const [{ posts, isLoading }, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        async function fetchData() {
            try {
                dispatch({ type: "START" });
                const res = await fetch(
                    `https://jsonplaceholder.typicode.com/posts`
                );
                const data = await res.json();
                dispatch({ type: "POSTS_FETCHED", payload: data });
                console.log("posts ==>", data);
            } catch (error) {
                dispatch({ type: "ERROR", payload: error });
            }
        }
        fetchData();
    }, []);

    if (isLoading) return <h2>Loading ... </h2>;
    return (
        <div>
            {posts.map((post) => (
                <Card
                    key={post.id}
                    sx={{ maxWidth: 345 }}
                    post={post}
                    variant="outlined"
                />
            ))}
        </div>
    );
}

function Card({ post }) {
    return (
        <React.Fragment>
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                >
                    Posts
                </Typography>
            </CardContent>
            <CardContent>{post.title}</CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </React.Fragment>
    );
}

export default App;
