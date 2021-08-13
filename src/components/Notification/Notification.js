import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';


export default props => {
  const { message, messageId, priority, color, clearSingleNotification } = props;

  const useStyles = makeStyles({
    container: {
      backgroundColor: color     
    }
  });
  

  const classes = useStyles();
  return (
    <Paper
      elevation={10}
      variant='elevation'
      className={classes.container}
    >
     <Typography>{message} {priority} {color}</Typography>
     <Typography>
      <a 
        onClick={() => { clearSingleNotification(messageId) }}
      >
        Clear
      </a>
    </Typography> 
    </Paper>
  )
}