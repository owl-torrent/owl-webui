import OwlWebUi from "../OwlWebUi";
import { connect } from "react-redux";
import { getInitialState } from "../../../store/actions/state";
import Props from "../props";

const OwlWebUiContainer = (props: Props) => {
  return <OwlWebUi {...props} />;
};

export default connect(null, { getInitialState })(OwlWebUiContainer);
