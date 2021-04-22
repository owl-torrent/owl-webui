import React from 'react'
import { AppBar, IconButton, Toolbar, List, ListItem, ListItemText, ListItemIcon, Hidden } from '@material-ui/core'
import { Dashboard as DashboardIcon, Menu as MenuIcon, Subject as SubjectIcon, Settings as SettingsIcon, UploadFile as UploadFileIcon, WifiOff as WifiOffIcon } from '@material-ui/icons'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import ThemeAlterator from '../modules/theme/theme-alterator'
import { useHistory, useRouteMatch } from 'react-router'
import { StompAuthButton, useApis } from '../modules/api'
import logo from './app-logo.png'
import { GlobalStateActionButton } from '../components/global'
import clsx from 'clsx'
import { DesktopDrawer, MobileDrawer } from './drawer'

const useStyles = makeStyles((theme: Theme) => createStyles({
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
  connectToServerButton: {
    color: theme.palette.error.main
  },
  offsetListIcon: {
    paddingLeft: theme.spacing(1),
  },
}))

interface Props {
  children: React.ReactNode
}

const DrawerContent: React.FC<{}> = () => {
  const classes = useStyles()
  const history = useHistory()
  const { apis: { isConnected } } = useApis()
  const matchSeedRoute = useRouteMatch("/seed*")
  const matchConfigRoute = useRouteMatch("/config*")
  const matchDashboardRoute = useRouteMatch("/dashboard*")
  const matchReadTimeLogRoute = useRouteMatch("/real-time-log*")
  const matchConnectApiRoute = useRouteMatch("/connect-api*")


  return React.useMemo(() => {
    const items = [
      { name: "Torrents", sendTo: '/seed', match: matchSeedRoute, icon: <UploadFileIcon />, stompRequired: true },
      { name: "Config", sendTo: '/config', match: matchConfigRoute, icon: <SettingsIcon />, stompRequired: true },
      { name: "Dashboard", sendTo: '/dashboard', match: matchDashboardRoute, icon: <DashboardIcon />, stompRequired: true },
      { name: "Real time logs", sendTo: '/real-time-log', match: matchReadTimeLogRoute, icon: <SubjectIcon />, stompRequired: true },
    ]
    if (!isConnected) {
      items.push({ name: "Connect to server", sendTo: '/connect-api', match: matchConnectApiRoute, icon: <WifiOffIcon className={classes.connectToServerButton} />, stompRequired: false})
    }

    return <List dense>
      {items.map(item =>
        <ListItem key={item.name} disabled={item.stompRequired && !isConnected} button selected={item.match !== null} onClick={() => history.push(item.sendTo)}>
          <ListItemIcon className={classes.offsetListIcon}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      )}
    </List>
  }, [isConnected, matchSeedRoute, matchConfigRoute, matchDashboardRoute, matchReadTimeLogRoute, matchConnectApiRoute, history, classes.connectToServerButton])
}

const Layout: React.FC<Props> = (props) => {
  const { children } = props
  const classes = useStyles()
  const { apis: { isConnected } } = useApis()
  const [openDrawer, setOpenDrawer] = React.useState(false)

  const list = <DrawerContent />

  return (
    <div>
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
