import React, { useContext, useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import MessageIcon from '@material-ui/icons/Message'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/Email'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Alertcontext } from '../../context'
import emailjs from 'emailjs-com';


const Contact = () => {
  const initial = {
    username: '',
    email: '',
    message: ''
  }
  const { alert, setAlert, setShowAlert } = useContext(Alertcontext)
  const [formData, setFormData] = useState(initial)


  const handleSubmit = e => {
    e.preventDefault()
    let confirmed = window.confirm('are you sure u want to send this message')
    if (confirmed) {
      sendEmail()
      // console.log('sending')
    }

  }
  const sendEmail = () => {
    let variables = {
      message: formData.message,
      name: formData.username,
      email: formData.email,
    }
    emailjs.send(process.env.REACT_APP_EMAIL_SERVICE_ID, process.env.REACT_APP_EMAIL_TEMPLATE_ID, variables).then(res => {
      setAlert({ ...alert, message: "Message sent succesfully,you can expect to hear from us soon", type: 'success' })
      setShowAlert(true)
      setFormData(initial)
    }).catch(err => {
      setAlert({ ...alert, message: err.text, type: 'error' })
      setShowAlert(true)
    })

  }
  useEffect(() => {

    return () => {
      setShowAlert(false)
    }
  }, [setShowAlert])

  const useStyles = makeStyles(theme => ({

    avatar: {
      textAlign: 'center',
      margin: '10px auto',
      backgroundColor: theme.palette.primary.main
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    h2: {
      marginBottom: '1rem',
    },
    secondary: {
      color: '#3f51b5',
      background: 'transparent'
    }

  }))

  const classes = useStyles()

  return (
    <div className='contact-container'>
      <Avatar className={classes.avatar}>
        <MessageIcon />
      </Avatar>
      <Typography className={classes.h2} component='h1' variant='h5'>
        Contact us
    </Typography>
      <form
        className='contact-form'
        onSubmit={handleSubmit}
        noValidate={false}
      >
        <input
          required
          onChange={e =>
            setFormData({ ...formData, username: e.target.value })
          }
          name='username'
          placeholder='Username'
          value={formData.username}
          type='text'
          id='username'
          autoComplete='username'
          autoFocus
        />
        <input
          margin='normal'
          required
          value={formData.email}
          type='email'
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          id='email'
          placeholder='Email Address'
          name='email'
          autoComplete='email'
        />
        <textarea className='textarea' placeholder='message' value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}>
        </textarea>
        <Button
          type='submit'
          color='primary'
          variant='contained'
          className={classes.submit}
        >
          Send
      </Button>
      </form>
      <div className='contact-info'>
        <div className='contact-info-item'>
          <Avatar className={classes.secondary}>
            <PhoneIcon />
          </Avatar>
          <span className='contact phone'>0796914452</span>
        </div>
        <div className='contact-info-item'>
          <Avatar className={classes.secondary}>
            <EmailIcon />
          </Avatar>
          <a
            className='contact email'
            href='mailto:keplalabs@gmail.com'
          >
            keplalabs@gmail.com
        </a>
        </div>
      </div>
    </div>
  )
}

export default Contact
