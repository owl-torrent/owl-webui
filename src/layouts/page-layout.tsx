import React from 'react'
import { AppBar, IconButton, Toolbar, List, ListItem, ListItemText, ListItemIcon, Hidden } from '@material-ui/core'
import { Dashboard as DashboardIcon, Menu as MenuIcon, Subject as SubjectIcon, Settings as SettingsIcon, UploadFile as UploadFileIcon } from '@material-ui/icons'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import ThemeAlterator from '../modules/theme/theme-alterator'
import { useHistory, useRouteMatch } from 'react-router'
import { StompAuthButton, useApis } from '../modules/api'
import logo from './app-logo.png'
import { GlobalStateActionButton } from '../components/global'
import clsx from 'clsx'
import { DesktopDrawer, MobileDrawer } from './drawer'

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {

  },
  flex: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: theme.palette.background.default,
    boxShadow: `inset 0 -1px 0 ${theme.palette.divider}`,
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
  },
  drawer: {
    flexShrink: 0,
  },
  mainContent: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1),
  },
}))

interface Props {
  children: React.ReactNode
}

const DrawerContent: React.FC<{}> = () => {
  const history = useHistory()
  const matchSeedRoute = useRouteMatch("/seed*")
  const matchConfigRoute = useRouteMatch("/config*")
  const matchDashboardRoute = useRouteMatch("/dashboard*")
  const matchReadTimeLogRoute = useRouteMatch("/real-time-log*")


  return React.useMemo(() => {
    const items = [
      { name: "Torrents", sendTo: '/seed', match: matchSeedRoute, icon: <UploadFileIcon /> },
      { name: "Config", sendTo: '/config', match: matchConfigRoute, icon: <SettingsIcon /> },
      { name: "Dashboard", sendTo: '/dashboard', match: matchDashboardRoute, icon: <DashboardIcon /> },
      { name: "Real time logs", sendTo: '/real-time-log', match: matchReadTimeLogRoute, icon: <SubjectIcon /> },
    ]

    return <List dense>
      {items.map(item =>
        <ListItem key={item.name} button selected={item.match !== null} onClick={() => history.push(item.sendTo)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      )}
    </List>
  }, [matchSeedRoute, matchConfigRoute, matchDashboardRoute, matchReadTimeLogRoute, history])
}

// TODO next:
//  - Remove drawer if not connected to stomp
//  - Center drawer icons in desktop mode. To be aligned with appbar icon menu
//  - Change drawer "selected" style (something like gmail looks nice)
const Layout: React.FC<Props> = (props) => {
  const { children } = props
  const classes = useStyles()
  const { apis: { isConnected } } = useApis()
  const [openDrawer, setOpenDrawer] = React.useState(false)

  const list = <DrawerContent />

  return (
    <div className={classes.root}>
      <AppBar
        className={classes.appBar}
        position="sticky"
        elevation={0}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => setOpenDrawer(current => !current)}>
            <MenuIcon />
          </IconButton>
          <Hidden smDown><img src={logo} height="40px" alt="Joal" /></Hidden>
          <div className={clsx(classes.grow, classes.centerContent)}>
            <div className={classes.inlineFlex}>
              {isConnected &&
                <GlobalStateActionButton className={clsx(classes.inlineFlex, classes.seedButton)} color="secondary" variant="outlined" />
              }
            </div>
          </div>
          <span className={classes.inlineFlex}>
            <ThemeAlterator />
            <StompAuthButton />
          </span>
        </Toolbar>
      </AppBar>

      <div className={classes.flex}>
        <Hidden mdUp>
          <MobileDrawer className={classes.drawer} forceOpen={openDrawer} setOpen={() => setOpenDrawer(true)} setClose={() => setOpenDrawer(false)}>
            {list}
          </MobileDrawer>
        </Hidden>
        <Hidden smDown><DesktopDrawer className={classes.drawer} forceOpen={openDrawer}>{list}</DesktopDrawer></Hidden>

        <main className={classes.mainContent}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
