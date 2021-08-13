import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Notification from '../Notification/Notification';


export default props => {
  const { notifications, color, clearSingleNotification } = props;
  // console.log(`notifications`, notifications);

  const useStyles = makeStyles({
    column: {
      maxWidth: '200px',
    },
    notifier: {
      backgroundColor: props.color
    }
  });

  return (
    <div style={{ border: '2px dashed green' }}>
      <h2>{props.title}</h2>
      <p>Count {notifications.length}</p>
      { notifications.map(notification => (
        <div key={notification.id}>
          <Notification 
            message={notification.message}
            priority={notification.priority}
            messageId={notification.id}
            color={color}
            clearSingleNotification={clearSingleNotification}
          />
        </div>
      ))}
    </div>
  )
}