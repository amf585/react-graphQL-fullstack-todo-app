import React, { useState } from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useMutation } from '@apollo/client';
import { ADD_TASK } from '../graphql/mutations';
import { GET_TASKS } from '../graphql/queries';

// Component styles
const useStyles = makeStyles({
    button: {
        marginBottom: '10px',
        marginTop: '20px',
        textAlign: 'center'
    },
    controls: {
        display: 'grid',
        placeContent: 'center',
        minWidth: '300px'
    },
    dialog: {
        background: 'rgba(0, 0, 0, 0.7)',
    } 
});

const AddTaskForm = () => {
    const classes = useStyles();
    const [taskName, setTaskName] = useState('');
    const [open, setOpen] = useState(false);

    // Mutation to add task, and refresh data
    const [addMutation] = useMutation(ADD_TASK, {
        refetchQueries: [
            { query: GET_TASKS }
        ]  
    }); 

    // Add task handler
    const addTask = ($event) => {
        $event.preventDefault();
        addMutation({ variables: { name: taskName } });
        setTaskName('');
        handleClose();
    }

    // Close modal form
    const handleClose = () => {
        setOpen(false);
    }

    // Open modal form
    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <div>
            <Button variant="outlined" 
                    color="primary" 
                    startIcon={<AddCircleOutlineIcon/>}
                    onClick={handleOpen}>
                Add New Task
            </Button>

            <Dialog className={classes.dialog} open={open} onClose={handleClose}>
                <DialogTitle>Add Task</DialogTitle>
                <DialogContent>
                    <form onSubmit={($event) => addTask($event)}>
                        <TextField autoFocus
                                required
                                color="secondary"
                                id="task" 
                                label="Task Text" 
                                type="text" 
                                value={taskName} 
                                onChange={($event)=> setTaskName($event.target.value)} 
                                fullWidth />
                        <div className={classes.controls}>
                            <Button className={classes.button} variant="contained" color="secondary" type="submit">
                                Add Task
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddTaskForm;
