import React from 'react'
import { Grid, AppBar, IconButton, Toolbar, List, ListItem, ListItemText, ListItemIcon, Hidden } from '@material-ui/core'
import { Dashboard as DashboardIcon, Menu as MenuIcon } from '@material-ui/icons'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import ThemeAlterator from '../modules/theme/theme-alterator'
import { useHistory, useRouteMatch } from 'react-router'
import { StompAuthButton, useApis } from '../modules/api'
import logo from './app-logo.png'
import { GlobalStateActionButton } from '../components/global'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: `inset 0 -1px 0 ${theme.palette.divider}`
  },
  inlineFlex: {
    display: 'inline-flex'
  },
  grow: {
    flexGrow: 1,
  },
  centerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  seedButton: {
    [theme.breakpoints.up('sm')]: {
      width: 200,
    },
  }
}))

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
  const { apis: { isConnected } } = useApis()

  return (
    <>
      <AppBar
        position="sticky"
        className={classes.appBar}
        elevation={0}
        color="transparent"
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Hidden smDown><img src={logo} height="40px" alt="Joal" /></Hidden>
          <div className={clsx(classes.grow, classes.centerContent)}>
            <div className={classes.inlineFlex}>
              {isConnected &&
                <GlobalStateActionButton className={clsx(classes.inlineFlex, classes.seedButton)} color="secondary" variant="contained" />
              }
            </div>
          </div>
          <span className={classes.inlineFlex}>
            <ThemeAlterator />
            <StompAuthButton />
          </span>
        </Toolbar>
      </AppBar>

      <Grid container direction="row">
        <Grid item xs>
          <main>
            {children}
          </main>
        </Grid>
      </Grid>
    </>
  )
}

export default Layout
