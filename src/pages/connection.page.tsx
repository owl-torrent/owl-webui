import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import React from 'react'
import { useApis } from '../api/contexts/provider'

interface Props {
  
}

const ConnectionPage: React.FC<Props> = () => {
  const {apis: {connectionParams}, changeConnectionParams} = useApis()
  const [port, setPort] = React.useState<string>(connectionParams.port)
  const [prefix, setPrefix] = React.useState<string>(connectionParams.pathPrefix)

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation()
    e.preventDefault()

    changeConnectionParams(connectionParams.host, port, connectionParams.secure, prefix)
  }

  const handleChangePort = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setPort(e.target.value)
  const handleChangePrefix = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setPrefix(e.target.value)

  return (
    <React.Fragment>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <Button
              id="submit"
              type="submit"
              variant="outlined"
            >
              Go
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  )
}

export default ConnectionPage
