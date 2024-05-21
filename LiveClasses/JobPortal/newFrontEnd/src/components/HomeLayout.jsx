import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";

const Container = styled.div`
    height: 100vh;
`;
const Main = styled.main`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 80vh;
    background-color: #f1edec;
`;
function HomeLayout() {
    return (
        <Container>
            <Header />
            <Main>
                <Outlet />
            </Main>
        </Container>
    );
}

export default HomeLayout;
