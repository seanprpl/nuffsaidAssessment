import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import MessageColumn from '../../components/MessageColumn/MessageColumn';
import { makeStyles } from '@material-ui/core';

// split the messages off into state
// pass the state down to 

const useStyles = makeStyles({
  container: {
    margin: '0 auto'
  }
});

export default props => {
  const { messages, clearSingleNotification } = props;
  const classes = useStyles();
  const [errors, setErrors] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [infos, setInfos] = useState([]);


  
  // split messages into state/categories
  useEffect(() => {
    if (messages.length === 0) {
      setErrors([]);
      setWarnings([]);
      setInfos([]);
    }

    const newErrors = messages.filter(message => message.priority == 1);
    const newWarnings = messages.filter(message => message.priority == 2);
    const newInfos = messages.filter(message => message.priority == 3);

    setErrors(newErrors);
    setWarnings(newWarnings);
    setInfos(newInfos);

    // messages.forEach(message => {
    //   const { priority } = message;

    //   if (priority === 1) {
    //     setErrors([...errors, message]);
    //     setWarnings([...warnings]);
    //     setInfos([...infos]);
    //   }
    //   else if (priority === 2) {
    //     setWarnings([...warnings, message]);
    //     setErrors([...errors]);
    //     setInfos([...infos]);
    //   }
    //   else if (priority === 3) {
    //     setInfos([...infos, message]);
    //     setErrors([...errors]);
    //     setWarnings([...warnings]);
    //   }
    // });
  }, [props]);

  

  return (
    <Grid
      container
      className={classes.container}
      align='center'
    >
      <MessageColumn 
        notifications={errors}
        clearSingleNotification={clearSingleNotification}
        color='#F56236' 
        title='Error Type 1'
      />
      <MessageColumn 
        notifications={warnings} 
        clearSingleNotification={clearSingleNotification}
        color='#FCE788' 
        title='Warning Type 2'
      />
      <MessageColumn 
        notifications={infos} 
        clearSingleNotification={clearSingleNotification}
        color='#88FCA3' 
        title='Info Type 3'
      />
    </Grid>
  )
}