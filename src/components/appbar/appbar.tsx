import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import AppBar, { AppBarProps } from '@material-ui/core/AppBar'
import Toolbar, { ToolbarProps } from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'

const drawerMinWidth = 240

const useStyles = makeStyles((theme: Theme) => createStyles({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  title: {
    marginLeft: 36,
  },
  drawer: {
    minWidth: drawerMinWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
  },
  drawerOpen: {
    minWidth: drawerMinWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(9)} + 1px)`,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bartoolbar
    ...theme.mixins.toolbar
  },
  toolbarDense: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
    minHeight: 48
  },
  displayFlex: {
    display: 'flex'
  },
  grow: {
    flexGrow: 1,
  },
  drawerClosedWidth: {
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(9)} + 1px)`,
    },
  }
}))

interface JoalAppBarProps {
  title?: string
  drawerContent?: JSX.Element
  classNames?: string
  actionsButtons?: JSX.Element
  AppBarProps?: AppBarProps
  ToolbarProps?: ToolbarProps
}


const JoalAppBar: React.FC<JoalAppBarProps> = (props) => {
  const {
    title = 'Title here',
    drawerContent = undefined,
    classNames,
    actionsButtons = (<></>),
    AppBarProps = {},
    ToolbarProps = {}
  } = props
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const enterTimer = React.useRef<any>()
  const leaveTimer = React.useRef<any>()


  const handleDrawerOpen = (e: React.SyntheticEvent) => {
    if (e.type === 'click') { // When user explicitly click on the burger button, reset auto close timer
      clearTimeout(leaveTimer.current)
    }
    setOpen(true)
  }
  const handleDrawerClose = (e: React.SyntheticEvent) => {
    if (e.type === 'click') { // When user explicitly click on the burger button, reset auto open timer
      clearTimeout(enterTimer.current)
    }
    setOpen(false)
  }
  const handleDrawerEnter = (e: React.SyntheticEvent) => {
    clearTimeout(enterTimer.current)
    clearTimeout(leaveTimer.current)
    e.persist()
    enterTimer.current = setTimeout(() => {
      handleDrawerOpen(e)
    }, 200)
  }
  const handleDrawerLeave = (e: React.SyntheticEvent) => {
    clearTimeout(enterTimer.current)
    clearTimeout(leaveTimer.current)
    e.persist()
    leaveTimer.current = setTimeout(() => {
      handleDrawerClose(e)
    }, 1000)
  }

  return (
    <>
      <AppBar
        position="sticky"
        className={clsx(classes.appBar, classNames)}
        variant="outlined"
        elevation={0}
        {...AppBarProps}
      >
        <Toolbar variant="dense" className={clsx({
          [classes.toolbar]: (ToolbarProps?.variant !== 'dense'),
          [classes.toolbarDense]: (ToolbarProps?.variant === 'dense')
        })} {...ToolbarProps}>
          {Boolean(drawerContent) &&
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          }
          <Typography variant="h6" noWrap component="div" className={clsx(classes.grow, classes.title)}>
            {title}
          </Typography>
          <span className={classes.displayFlex}>
            {actionsButtons}
          </span>
        </Toolbar>
      </AppBar>
      {Boolean(drawerContent) &&
        <Drawer
          onMouseOver={handleDrawerEnter}
          onMouseLeave={handleDrawerLeave}
          open={open}
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          {/* insert a Toolbar to act as a content filler, it will be the same height as the AppBar Toolbar. The toolbar will be hidden under the real appbar */}
          <Toolbar className={clsx({
            [classes.toolbar]: (ToolbarProps?.variant !== 'dense'),
            [classes.toolbarDense]: (ToolbarProps?.variant === 'dense')
          })} {...ToolbarProps} />
          {drawerContent}
        </Drawer>
      }
    </>
  )
}

export default JoalAppBar
