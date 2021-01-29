import TorrentTable from "../../components/TorrentTable/TorrentTable";
import { useEffect } from "react";
import Props from "./props";

const OwlWebUi = (props: Props) => {
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
