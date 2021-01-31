import { Torrent, JoalState } from "../../api/Types/joalState";
import { connect } from "react-redux";
interface TorrentTableProps {
  torrents: { [hashKey: string]: Torrent };
}

const TorrentTable = (props: TorrentTableProps): JSX.Element => {
  const renderTorrents = () => {
    return (
      Object.keys(props.torrents).length > 0 &&
      Object.keys(props.torrents).map((torrent) => (
        <div key={torrent}>{props.torrents[torrent].name}</div>
      ))
    );
  };
  return <div>{renderTorrents()}</div>;
};

const mapStateToProps = (
  state: JoalState
): { torrents: { [hashKey: string]: Torrent } } => {
  return { torrents: state.torrents };
};

export default connect(mapStateToProps)(TorrentTable);
