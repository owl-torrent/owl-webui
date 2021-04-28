import React from 'react'
import { useSelector } from 'react-redux'
import { DataGrid, GridColumns } from '@material-ui/data-grid'
import { bandwidthSelectors, torrentsSelectors } from '../../../features/api'
import { Torrent } from '../../../modules/api'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import NoRowsOverlay from './no-rows-overlay'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import filesize from 'filesize'


const useStyles = makeStyles((theme: Theme) => createStyles({
  statusDead: {
    color: theme.palette.error.dark
  },
  statusAlive: {
    color: theme.palette.success.dark
  },
}))

const AliveStatusIcon: React.FC = () => {
  const classes = useStyles()
  return <FiberManualRecordIcon className={classes.statusAlive} />
}

const DeadStatusIcon: React.FC = () => {
  const classes = useStyles()
  return <FiberManualRecordIcon className={classes.statusDead} />
}

const SpeedCell: React.FC<{ infohash: string }> = (props) => {
  const { infohash } = props
  const bandwidth = useSelector(bandwidthSelectors.selectBandwidth)

  const torrentBw = bandwidth.torrents[infohash]
  const speed = React.useMemo(() => {
    if (!torrentBw) {
      return 0
    }
    return torrentBw.percentOfBandwidth * bandwidth.currentBandwidth
  }, [torrentBw, bandwidth.currentBandwidth])


  return <span>{`${filesize(speed, { base: 10 })}/s`}</span>
}

const columns: GridColumns = [
  { field: 'name', headerName: 'Torrent', type: 'string', width: 300 },
  {
    field: 'state',
    headerName: 'State',
    description: 'Describes if a torrent succesfully announce to his tracker',
    align: 'center',
    headerAlign: 'center',
    width: 100,
    renderCell: (param) => {
      const trackers = (param.row as Torrent).trackers
      const announceSuccessfully = Object.keys(trackers)
        .map(k => trackers[k])
        .filter(t => t.inUse && t.announceHistory.length > 0 && t.announceHistory[0].wasSuccessful)
        .some(t => t.inUse && t.announceHistory.length > 0 && t.announceHistory[0].wasSuccessful)

      return announceSuccessfully ? <AliveStatusIcon /> : <DeadStatusIcon />
    },
  },
  { field: 'seeders', headerName: 'Seeder', description: 'Number of people uploading the torrent', type: 'number', width: 100 },
  { field: 'leechers', headerName: 'Leechers', description: 'Number of people downloading the torrent', type: 'number', width: 115 },
  { field: 'speed', headerName: 'Upload Speed', description: 'Upload speed', renderCell: (param) => <SpeedCell infohash={(param.row as Torrent).infohash} />,  width: 150 },
]

const TableBody: React.FC = () => {
  const torrents = useSelector(torrentsSelectors.selectTorrents)

  return <>
    <DataGrid
      checkboxSelection
      density="compact"
      getRowId={t => (t as Torrent).infohash}
      columns={columns}
      rows={Object.keys(torrents).map(k => torrents[k])}
      components={{
        NoRowsOverlay: NoRowsOverlay
      }}
    />
  </>
}



export default TableBody
