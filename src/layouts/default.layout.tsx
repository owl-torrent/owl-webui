import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import ThemeAlterator from '../modules/theme/theme-alterator'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import { useHistory, useRouteMatch } from 'react-router'
import JoalAppBar from '../components/appbar'
import StompAuthButton from '../modules/api/auth/stomp-auth-button'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawerMargin: {
      marginLeft: `calc(${theme.spacing(7)} + 1px)`,
      [theme.breakpoints.up('sm')]: {
        marginLeft: `calc(${theme.spacing(9)} + 1px)`,
      },
    }
  }),
)

interface Props {
  children: React.ReactNode
}

const DrawerContent: React.FC<{}> = () => {
  const history = useHistory()
  const matchAstreinteRoute = useRouteMatch("/dashboard*")

  return (
    <List>
      <ListItem button selected={matchAstreinteRoute !== null} onClick={() => history.push('/dashboard')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      
    </List>
  )
}

const Layout: React.FC<Props> = (props) => {
  const { children } = props
  const classes = useStyles()

  const appBarActionsButtons = (
    <>
      <ThemeAlterator />
      <StompAuthButton />
    </>
  )

  return (
    <>
      <JoalAppBar
        title="Joal"
        ToolbarProps={{ variant: "dense" }}
        actionsButtons={appBarActionsButtons}
        drawerContent={<DrawerContent />}
      />

      <Grid container direction="row">
        <Grid item xs className={classes.drawerMargin}>
          <main>
            {children}
          </main>
        </Grid>
      </Grid>
    </>
  )
}

export default Layout
