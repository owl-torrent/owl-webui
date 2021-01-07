import OwlWebUi from "../OwlWebUi";
import { connect } from "react-redux";
import { getInitialState } from "../../../store/actions/state";

const OwlWebUiContainer = (props) => {
    return <OwlWebUi {...props} />;
};


export default connect(null, { getInitialState })(OwlWebUiContainer);
