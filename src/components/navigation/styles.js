import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
    navText: {
        fontWeight: '200',
        fontFamily:'sans-serif',
        textTransform:'none'
    },
    contributeButton:{
        backgroundColor:'#7C2500',
        color:'#fff',
        padding:'10px',
        margin:'0 10px',
        '&:hover':{
            backgroundColor:'#d34203',
        },
        
    }
}
))