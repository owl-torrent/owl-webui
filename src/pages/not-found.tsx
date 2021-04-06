import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {useHistory} from "react-router-dom"


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    errorContainer: {
      textAlign: 'center',
      fontSize: 106,
      [theme.breakpoints.down('sm')]: {
        fontSize: 53,
      },
      fontFamily: 'sans-serif',
      fontWeight: 800,
      margin: '70px 15px',
    },
    four: {
      display: 'inline-block',
      position: 'relative',
      width: 136,
      height: 43,
      [theme.breakpoints.down('sm')]: {
        width: 68,
        height: 21.5,
      },
      borderRadius: 999,
      background: 'linear-gradient(140deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 43%, transparent 44%, transparent 100%), linear-gradient(105deg, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.06) 41%, rgba(0, 0, 0, 0.07) 76%, transparent 77%, transparent 100%), linear-gradient(to right, #cbc218, #ffc107)',
      '&::before, &::after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        borderRadius: 999
      },
      '&::before': {
        width: 43,
        height: 156,
        left: 60,
        bottom: -43,
        [theme.breakpoints.down('sm')]: {
          width: 21.5,
          height: 78,
          left: 30,
          bottom: -21.5,
        },
        background: 'linear-gradient(128deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 40%, transparent 41%, transparent 100%), linear-gradient(116deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 50%, transparent 51%, transparent 100%), linear-gradient(to top, #8bc34a, #a0c339, #b6c229, #cbc218, #ffc107)',
      },
      '&::after': {
        width: 137,
        height: 43,
        left: -18,
        bottom: 36,
        [theme.breakpoints.down('sm')]: {
          width: 68.5,
          height: 21.5,
          left: -9,
          bottom: 18,
        },
        transform: 'rotate(-49.5deg)',
        background: 'linear-gradient(to right, #8bc34a, #a0c339, #b6c229, #cbc218, #ffc107)',
      },
    },
    zero: {
      display: 'inline-block',
      position: 'relative',
      verticalAlign: 'text-top',
      width: 156,
      height: 156,
      margin: '0 25px',
      [theme.breakpoints.down('sm')]: {
        width: 78,
        height: 78,
        margin: '0 10px',
      },
      borderRadius: 999,
      background: 'linear-gradient(-45deg, transparent 0%, rgba(0, 0, 0, 0.06) 50%,  transparent 51%, transparent 100%), linear-gradient(to top right, #8bc34a, #a0c339, #b6c229, #cbc218, #ffc107)',
      overflow: 'hidden',
      animation: '$bgshadow 5s infinite',
      '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        transform: 'rotate(45deg)',
        width: 90,
        height: 90,
        [theme.breakpoints.down('sm')]: {
          width: 45,
          height: 45,
        },
        backgroundColor: 'transparent',
        left: '0',
        bottom: '0',
        background: 'linear-gradient(95deg, transparent 0%, transparent 8%, rgba(0, 0, 0, 0.07) 9%, transparent 50%, transparent 100%), linear-gradient(85deg, transparent 0%, transparent 19%, rgba(0, 0, 0, 0.05) 20%, rgba(0, 0, 0, 0.07) 91%, transparent 92%, transparent 100%)',
      },
      '&::after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        borderRadius: 999,
        width: 70,
        height: 70,
        left: 43,
        bottom: 43,
        [theme.breakpoints.down('sm')]: {
          width: 35,
          height: 35,
          left: 21.5,
          bottom: 21.5,
        },
        background: '#FDFAF5',
        boxShadow: '-2px 2px 2px 0px rgba(0, 0, 0, 0.1)',
      },
    },
    screenReaderText: {
      position: 'absolute',
      top: '-9999em',
      left: '-9999em',
    },
    '@keyframes bgshadow': {
      '0%': {
        boxShadow: 'inset -160px 160px 0px 5px rgba(0, 0, 0, 0.4)'
      },
      '45%': {
        boxShadow: 'inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1)'
      },
      '55%': {
        boxShadow: 'inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1)'
      },
      '100%': {
        boxShadow: 'inset 160px -160px 0px 5px rgba(0, 0, 0, 0.4)'
      },
    },
    errorText: {
      textAlign: 'center'
    },
    goBackToHomeWrapper: {
      marginTop: 25
    }
  })
);


interface Props {

}

const NotFound: React.FC<Props> = () => {
  const classes = useStyles()
  const history = useHistory()

  React.useEffect(() => {document.title = "JOAL - 404 Not found"}, [])

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item lg={8}>
        <section className={classes.errorContainer}>
          <span className={classes.four}><span className={classes.screenReaderText}>4</span></span>
          <span className={classes.zero}><span className={classes.screenReaderText}>0</span></span>
          <span className={classes.four}><span className={classes.screenReaderText}>4</span></span>
        </section>
        <Typography variant="h4" className={classes.errorText}>Oops ! La resource à laquelle vous essayez d'acceder n'existe pas ou a disparue</Typography>
      </Grid>
      <Grid item className={classes.goBackToHomeWrapper}>
        <Button variant="outlined" onClick={() => history.replace('/')}>
          Retour a l'acceuil
        </Button>
      </Grid>
    </Grid>
  )
}



export default NotFound
