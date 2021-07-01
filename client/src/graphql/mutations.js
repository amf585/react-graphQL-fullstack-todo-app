import { gql } from "@apollo/client";

// Add new task
export const ADD_TASK = gql`
    mutation($name: String) {
        addTask(name: $name)
    }
`;

// Mark task as completed
export const COMPLETE_TASK = gql`
    mutation($completed: Boolean, $id: Int) {
        completeTask(completed: $completed, id: $id)
    }
`;

// Remove task from todo list
export const REMOVE_TASK = gql`
    mutation($id: Int) {
        removeTask(id: $id)
    }
`;