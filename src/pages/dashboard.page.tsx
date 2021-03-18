import React from 'react'
import Grid from '@material-ui/core/Grid'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import PageLayout from '../layouts/default.layout'
import Container from '@material-ui/core/Container'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3)
    },
  }),
)


interface Props {
}

const Dashboard: React.FC<Props> = () => {
  const classes = useStyles()

  return (
    <PageLayout>
      <Container maxWidth="lg" className={classes.root}>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            dashboard page
          </Grid>
        </Grid>
      </Container>
    </PageLayout>
  )
}



export default Dashboard
