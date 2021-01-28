import TorrentTable from "../../components/TorrentTable/TorrentTable";
import { useEffect } from "react";
const OwlWebUi = (props: any) => {
  const { getInitialState } = props;

  useEffect(() => {
    getInitialState();
  }, [getInitialState]);

  return (
    <div>
      <TorrentTable />
    </div>
  );
};

export default OwlWebUi;
