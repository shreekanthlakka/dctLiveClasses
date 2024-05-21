import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./LoginHeader";

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

function Layout() {
    return (
        <div>
            <Container>
                <Header />
                <Main>
                    <Outlet />
                </Main>
            </Container>
        </div>
    );
}

export default Layout;
