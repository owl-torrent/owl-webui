import { useEffect, useState } from "react";
import { fetchConfig } from "../../configuration";
import OwlWebUi from "../OwlWebUi/container";
const App = () => {
  const [config, setConfig] = useState(false);

  const renderApp = () => {
    return config ? <OwlWebUi /> : null;
  };

  useEffect(() => {
    fetchConfig().then((config) => {
      setConfig(config);
    });
  }, []);

  return <div>{renderApp()}</div>;
};

export default App;
