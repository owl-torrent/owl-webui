import {useTypedSelector} from "../../Hooks/useTypedSelector"

const TorrentTable: React.FC = () => {
  const torrents = useTypedSelector(state => state.torrents)
  const renderTorrents = () => {
    return (
      Object.keys(torrents).length > 0 &&
      Object.keys(torrents).map((torrent) => (
        <div key={torrent}>{torrents[torrent].name}</div>
      ))
    );
  };
  return <div>{renderTorrents()}</div>;
};



export default TorrentTable;
