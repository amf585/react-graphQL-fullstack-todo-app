import React, { useContext } from 'react';
import { TaskContext } from '../Context';
import Task from '../components/Task';
import { List } from '@material-ui/core';

const TaskList = () => {
  const [context] = useContext(TaskContext);

  // Loading text
  if (!context.taskItems) return <h1>Loading...</h1>

  return (
    <List>
      {
        context?.taskItems.map(({ id, name, completed }) => {
          return <Task key={id}  id={id} name={name} completed={completed} />
        })
      }
    </List>
  );
}

export default TaskList;
