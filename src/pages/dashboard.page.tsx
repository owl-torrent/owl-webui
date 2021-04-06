import React from 'react'
import Grid from '@material-ui/core/Grid'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import PageLayout from '../layouts/default.layout'
import Container from '@material-ui/core/Container'
import StateManager from '../components/global'


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

  React.useEffect(() => { document.title = "JOAL - Dashboard" }, [])

  return (
    <PageLayout>
      <Container maxWidth="lg" className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={3}>
            <StateManager />
          </Grid>
        </Grid>
      </Container>
    </PageLayout>
  )
}



export default Dashboard
