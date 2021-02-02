import OwlWebUi from "../OwlWebUi";
import {useActions} from "../../../Hooks/useActions"

const OwlWebUiContainer: React.FC = () => {
  const {getInitialState} = useActions();
  return <OwlWebUi getInitialState={getInitialState} />;
};

export default OwlWebUiContainer;
