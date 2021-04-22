import React from 'react'
import { TextField, createStyles, makeStyles, Grid, Container, Theme, Typography, Hidden } from '@material-ui/core'
import { LoadingButton } from '@material-ui/lab'
import { Redirect } from 'react-router'
import { useLocation } from 'react-router-dom'
import { useApis } from '../modules/api'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3)
    },
    icon: {
      fontSize: 50,
      [theme.breakpoints.up('sm')]: {
        fontSize: 100,
      },
    },
    connectionButton: {
      paddingTop: theme.spacing(2),
    },
  }),
)

interface Props {

}

const ConnectionPage: React.FC<Props> = () => {
  const classes = useStyles()
  const location = useLocation()
  const { apis: { connectionParams, isConnected }, changeConnectionParams } = useApis()
  const [port, setPort] = React.useState<string>(connectionParams.port)
  const [prefix, setPrefix] = React.useState<string>(connectionParams.pathPrefix)

  React.useEffect(() => { document.title = "JOAL - Connexion" }, [])

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation()
    e.preventDefault()

    changeConnectionParams(connectionParams.host, port, connectionParams.secure, prefix)
  }

  const handleChangePort = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setPort(e.target.value)
  const handleChangePrefix = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setPrefix(e.target.value)

  let currentLocationState: { [key: string]: any } = (location.state && (location.state as any).from)
    ? (location.state as any)
    : { from: { pathname: '/' } } // get previous location or fallback to /

  if (isConnected) {
    return (<Redirect to={currentLocationState?.from as string} />)
  }

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={10} alignItems="center" direction="column">
        <Grid item>
          <Hidden smUp><Typography variant="h5">Server connection</Typography></Hidden>
          <Hidden smDown><Typography variant="h2">Server connection</Typography></Hidden>
          <Typography variant="subtitle1">
            Fill the fields and save parameters to connect
            </Typography>
        </Grid>

        <Grid item>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2} justifyContent="center" direction="row">
              <Grid item>
                <TextField
                  id="port"
                  label="Port"
                  size="small"
                  required
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', title: "Port must be a number" }}
                  InputLabelProps={{ shrink: Boolean(port) }}
                  value={port}
                  onChange={handleChangePort}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="secret-path-prefix"
                  label="Secret path prefix"
                  size="small"
                  required
                  InputLabelProps={{ shrink: Boolean(prefix) }}
                  value={prefix}
                  onChange={handleChangePrefix}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="center" direction="row" className={classes.connectionButton}>
              <Grid item>
                <LoadingButton
                  id="submit"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Save parameters
                  </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ConnectionPage
