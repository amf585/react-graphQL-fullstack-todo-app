import { gql } from "@apollo/client";

// Get all tasks
export const GET_TASKS = gql`
    {
        getTasks {
            id
            name
            completed
        }
    }
`;