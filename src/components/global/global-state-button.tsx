import React from 'react'
import { ButtonProps } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { globalSelectors } from '../../features/api'
import { dashboardActions, dashboardSelectors } from '../../features/ui'
import { useHttpApi } from '../../modules/api'
import { useSnackbar } from 'notistack'
import { PlayCircle as PlayCircleIcon, StopCircle as StopCircleIcon } from '@material-ui/icons'
import { LoadingButton } from '@material-ui/lab'

export interface GlobalStateActionButtonProps extends ButtonProps {

}

export const GlobalStateActionButton: React.FC<GlobalStateActionButtonProps> = (props) => {
  const httpApi = useHttpApi()
  const { enqueueSnackbar } = useSnackbar()
  const isSeedStarted = useSelector(globalSelectors.selectIsSeedStarted)
  const isStartingOrStopping = useSelector(dashboardSelectors.selectIsstartingOrStopping)
  const dispatch = useDispatch()
  const { setStartingOrStopping } = dashboardActions

  const handleClick = async () => {
    dispatch(setStartingOrStopping(true))
    try {
      await (isSeedStarted ? httpApi.global.stop() : httpApi.global.start())
    } catch (e) {
      enqueueSnackbar(e.message, { variant: 'error' })
    } finally {
      dispatch(setStartingOrStopping(false))
    }
  }

  return (
    <LoadingButton
      fullWidth
      color="inherit"
      variant="outlined"
      pending={isStartingOrStopping}
      pendingPosition="start"
      onClick={handleClick}
      startIcon={isSeedStarted ? <StopCircleIcon /> : <PlayCircleIcon />}
      {...props}>
        {isSeedStarted ? (isStartingOrStopping? 'stopping...' : 'stop seeding') : (isStartingOrStopping? 'starting...' : 'start seeding')}
    </LoadingButton>
  )
}
