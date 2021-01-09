import React, { useEffect, useContext } from 'react'
import { Loadingcontext } from '../../context'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MessageIcon from '@material-ui/icons/Message'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/Email'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
const Contact = () => {
  const { setLoading } = useContext(Loadingcontext)
  const handleSubmit = e => {
    e.preventDefault()
    console.log(e)
  }
  useEffect(() => {
    setLoading(false)
  }, [setLoading])

  const useStyles = makeStyles(theme => ({
    root: {
      height: '100vh'
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/JgOeRuGD_Y4)',
      backgroundRepeat: 'no-repeat',
      backdropFilter: 'brightness(80%)',
      backgroundColor:
        theme.palette.type === 'light'
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    center: {
      textAlign: 'center',
      width: '100%'
    },

    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    green: {
      color: '#fff',
      backgroundColor: 'green'
    }
  }))

  const classes = useStyles()

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={12} md={7} className={classes.image}>
        <div className='contact-info-container'>
          <div className='contact-info'>
            <Typography className={classes.center} component='h2' variant='h5'>
              Contact Information
            </Typography>
            <div className='contact-info-item'>
              <Avatar className={classes.green}>
                <PhoneIcon />
              </Avatar>
              <h5 className='contact phone'>0796914452</h5>
            </div>
            <div className='contact-info-item'>
              <Avatar className={classes.green}>
                <EmailIcon />
              </Avatar>
              <a
                className='text-primary contact email'
                href='mailto:keplalabs@gmail.com'
              >
                keplalabs@gmail.com
              </a>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <MessageIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Contact us
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit}
            noValidate={false}
          >
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='username'
              label='Username'
              type='text'
              id='username'
              autoComplete='username'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              type='email'
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
            />
            <TextField
              id='outlined-multiline-flexible'
              label='Message'
              multiline
              fullWidth
              rowsMax={6}
              //   value={''}
              //   onChange={handleChange}
              variant='outlined'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Send
            </Button>
            <Box mt={5}>{/* <Copyright /> */}</Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

export default Contact
