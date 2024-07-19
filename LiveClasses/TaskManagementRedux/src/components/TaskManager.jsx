import styled from "styled-components";
import CreateTask from "./CreateTask";
import ListingTasks from "./ListingTasks";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function TaskManager() {
    return (
        <Container>
            <CreateTask />
            <ListingTasks />
        </Container>
    );
}

export default TaskManager;
