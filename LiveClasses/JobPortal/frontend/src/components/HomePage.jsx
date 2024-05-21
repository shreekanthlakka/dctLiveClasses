import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 80vh;
    justify-content: center;
    align-items: center;
`;

const Button = styled.button`
    height: 50px;
    width: 100px;
    margin: 20px;
    padding: 5px;
    font-size: large;
    font-weight: 500;
`;

function HomePage() {
    return (
        <Container>
            <h3>Welcome to Job Portal app .</h3>
            <div>
                <Link to="/login">
                    <Button>Login</Button>
                </Link>
                <Link to="/signup">
                    <Button>Signup</Button>
                </Link>
            </div>
        </Container>
    );
}

export default HomePage;
