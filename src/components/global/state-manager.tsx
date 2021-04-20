import React from 'react'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { bandwidthSelectors } from '../../features/api'
import { torrentsSelectors } from '../../features/api'
import filesize from 'filesize'

export const TorrentStats: React.FC = () => {
  const torrent = useSelector(torrentsSelectors.selectTorrents)
  const bandwidth = useSelector(bandwidthSelectors.selectBandwidth)

  const torrentCount = React.useMemo(() => Object.keys(torrent).length, [torrent])
  const torrentWithUploadSpeed = React.useMemo(() => {
    return Object.keys(bandwidth.torrents).filter(infohash => bandwidth.torrents[infohash].percentOfBandwidth > 0.0).length
  }, [bandwidth.torrents])
  const overallSpeed = React.useMemo(() => {
    if (torrentWithUploadSpeed === 0) {
      return 0
    }
    return bandwidth.currentBandwidth
  }, [bandwidth.currentBandwidth, torrentWithUploadSpeed])

  if (torrentCount === 0) {
    return <></>
  }

  return <>
    <div>
      <Typography variant="body2" display="inline">
        {'Overall upload speed: '}
      </Typography>
      <Typography variant="body2" display="inline" fontWeight={500}>
        {`${filesize(overallSpeed, { base: 10 })}/s`}
      </Typography>
    </div>
  </>
}
