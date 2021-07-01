import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteForever from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import { useMutation } from '@apollo/client';
import { COMPLETE_TASK, REMOVE_TASK } from '../graphql/mutations';
import { GET_TASKS } from '../graphql/queries';

const Task = ({ id, name, completed }) => {

    // Mutation to remove task, and refresh data
    const [deleteMutation] = useMutation(REMOVE_TASK, {
        refetchQueries: [
            { query: GET_TASKS }
        ]  
    }); 

    // Mutation to complete task, and refresh data
    const [completeMutation] = useMutation(COMPLETE_TASK, {
        refetchQueries: [
            { query: GET_TASKS }
        ]  
    }); 

    // Remove task handler
    const removeTask = () => {
        deleteMutation({ variables: { id: +id }});
    }

    // Toggle task complete handler
    const toggleTaskComplete = (newCompleteValue) => {
        completeMutation({
            variables: {
                completed: newCompleteValue,
                id: +id
            }
        })
    }

    return (
        <ListItem key={id} dense button>
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    disableRipple
                    checked={completed}
                    onChange={($event) => toggleTaskComplete($event.target.checked) }/>
            </ListItemIcon>
            <Typography variant="h5" className={ completed ? 'completed-task' : null }>
                { name }
            </Typography>
            <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="comments"
                        onClick={removeTask}>
                <DeleteForever color="error" />
            </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default Task;
