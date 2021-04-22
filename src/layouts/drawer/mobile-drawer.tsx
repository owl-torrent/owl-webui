import React from "react"
import { SwipeableDrawer } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import clsx from "clsx"


const drawerWidth = 220

const useStyles = makeStyles((theme: Theme) => createStyles({
  drawer: {
    width: drawerWidth,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
  },
  drawerPaper: {
    width: drawerWidth,
  },
}))

interface Props {
  children: React.ReactNode
  forceOpen: boolean
  className?: string
  setOpen: () => void
  setClose: () => void
}

const DesktopDrawer: React.FC<Props> = (props) => {
  const classes = useStyles()
  const { forceOpen, className, setOpen, setClose, children } = props

  return <SwipeableDrawer
    className={clsx(className, classes.drawer)}
    onOpen={setOpen}
    onClose={setClose}
    open={forceOpen}
    onBackdropClick={setClose}
    classes={{
      paper: classes.drawerPaper,
    }}
    anchor="left"
  >
    {children}
  </SwipeableDrawer>
}

export default DesktopDrawer
