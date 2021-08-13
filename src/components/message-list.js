import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Api from '../api'
import { CssBaseline } from '@material-ui/core'
import MessageTable from '../modules/MessageTable/MessageTable';
import { v4 as uuidv4 } from 'uuid';
import { Snackbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';



class MessageList extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      messages: [],
      snackError: null,
      alreadyShownErrors: [],
      showSnakBar: false
    }
  }

  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message)
    },
  })

  componentDidMount() {
    this.api.start()
  }

  messageCallback(message) {
    message.id = uuidv4();
    const { messages , alreadyShownErrors,} = this.state
    const newMessages = [
      ...messages.slice(),
      message,
    ];
    const snackError = this.getFirstError(newMessages);
    if (alreadyShownErrors.some(error => snackError?.id === error.id)){
      this.setState({
        messages: newMessages,
      });
    } else {
      this.setState({
        messages: newMessages,
        snackError,
        showSnakBar: snackError ? true : false,
        alreadyShownErrors: snackError ? [...alreadyShownErrors, snackError] : [...alreadyShownErrors, ]
      });
    }
  }


  clearSingleNotification = notificationId => {
    if(this.state.snackError && (notificationId === this.state.snackError.id)) {
      this.setState({
        snackError: null,
        showSnakBar: false
      })
    }
    const filtered = this.state.messages.filter(message => {
      const matches = message.id !== notificationId;
      return matches;
    });

    this.setState({ messages: filtered });
  }


  getFirstError = (messages) => {
    if(Array.isArray(messages)) {
      const reversedArray = messages.reverse();
      const value = reversedArray.find(message =>  {
        return message.priority === 1
      });
      return value;
    }
  }


  renderButton() {
    const isApiStarted = this.api.isStarted()
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ margin: '0 auto', border: '2px dashed blue' }}>
          <CssBaseline />
          <Snackbar
          color='#F56236'
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            
            autoHideDuration={2000}
            open={this.state.showSnakBar}
            onClose={(event, recs) => {
              if(recs === "timeout") {
                if(this.state.snackError) {
                  this.setState({ showSnakBar: false});
                }
              }
            }}
            action={
              <React.Fragment>
                <IconButton
                  aria-label="close"
                  color="inherit"
                  // className={classes.close}
                  onClick={() => {
                    this.setState({snackError: null, showSnakBar: false});
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </React.Fragment>
            }
            message={this.state.snackError ? this.state.snackError.message : 'n/a'}
          />

          <Button
            variant="contained"
            onClick={() => {
              if (isApiStarted) {
                this.api.stop()
              } else {
                this.api.start()
              }
              this.forceUpdate()
            }}
            style={{ backgroundColor: 'lightgreen' }}
          >
            {isApiStarted ? 'Stop' : 'Start'}
          </Button>
          <Button 
            variant='contained'
            style={{ backgroundColor: 'lightgreen' }}
            onClick={() => {
              this.setState({ messages: [] });
            }}
          >
            Clear
          </Button>
          <MessageTable 
            messages={this.state.messages} 
            clearSingleNotification={this.clearSingleNotification}
          />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderButton()}
      </div>
    )
  }
}

export default MessageList
