import React from 'react'
import { Container, Grid} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3)
    },
    
  }),
)


interface Props {
}

const Seed: React.FC<Props> = () => {
  const classes = useStyles()

  React.useEffect(() => { document.title = "JOAL - Dashboard" }, [])

  return (
    <Container maxWidth="lg" className={classes.root}>

      <Grid container>
        <Grid item xs={12}>
          seed page
        </Grid>
      </Grid>
    </Container>
  )
}

export default Seed
