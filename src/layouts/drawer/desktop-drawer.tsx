import React from "react"
import { Drawer } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import clsx from "clsx"


const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) => createStyles({
  drawer: {
    width: drawerWidth,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
  },
  drawerPaper: {
    top: 'unset',
  },
  drawerOpen: {
    width: drawerWidth,
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
}))

interface Props {
  children: React.ReactNode
  forceOpen: boolean
  className?: string
}

const DesktopDrawer: React.FC<Props> = (props) => {
  const classes = useStyles()
  const { forceOpen, className, children } = props
  const enterTimer = React.useRef<any>()

  const [openHover, setOpenHover] = React.useState(false)

  React.useEffect(() => {
    return () => { clearTimeout(enterTimer.current) }
  }, [])

  const handleDrawerEnter = (e: React.SyntheticEvent) => {
    if (forceOpen) return
    clearTimeout(enterTimer.current)
    e.persist()
    enterTimer.current = setTimeout(() => {
      if (forceOpen) return
      setOpenHover(true)
    }, 200)
  }
  const handleDrawerLeave = (e: React.SyntheticEvent) => {
    if (forceOpen) return
    clearTimeout(enterTimer.current)
    setOpenHover(false)
  }

  const isDrawerOpen = forceOpen || openHover

  return <Drawer
    onMouseEnter={handleDrawerEnter}
    onMouseLeave={handleDrawerLeave}
    className={clsx(className, classes.drawer, {
      [classes.drawerOpen]: isDrawerOpen,
      [classes.drawerClose]: !isDrawerOpen,
    })}
    variant="permanent"
    classes={{
      paper: clsx(classes.drawerPaper, {
        [classes.drawerOpen]: isDrawerOpen,
        [classes.drawerClose]: !isDrawerOpen,
      }),
    }}
    anchor="left"
  >
    {children}
  </Drawer>
}

export default DesktopDrawer
