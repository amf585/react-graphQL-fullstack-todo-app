import './App.scss';
import React, { useMemo, useState } from 'react';
import { TaskContext } from './Context';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue, green, red } from '@material-ui/core/colors';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from './graphql/queries';

// Material UI theme
const theme = createMuiTheme({
  palette: {
    primary:   { main: green['A400'] },
    secondary: { main: blue[500] },
    warning:   { main: red[900] }
  },
  spacing: 8,
  typography: {
    h3: {
      fontSize: '2rem',
      fontWeight: 600
    },
    h5: {
      fontWeight: 400,
      marginRight: 20
    }
  }
});

function App() {
  const { data } = useQuery(GET_TASKS);
  const [context, setContext] = useState({taskItems: []});

  // Update context on data change
  useMemo((context) => {
    setContext({ ...context, taskItems: data?.getTasks });
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
      <TaskContext.Provider value={[context, setContext]}>
        <div className="app__container">
          <Typography align="center" color="secondary" variant="h3">
            Tasks ({ context?.taskItems?.length })
          </Typography>
          <TaskList/>
          <AddTaskForm/>
        </div>
      </TaskContext.Provider>
    </ThemeProvider>
  );
}

export default App;
