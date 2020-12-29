export const get_env = async () => {
  const {
    REACT_APP_CONFIG_ENDPOINT: configEndpoint,
    REACT_APP_CONFIG_PATH: mockConfigPath,
    REACT_APP_STATE_ENDPOINT: initStateEndpoint,
    REACT_APP_MOCK_STATE_PATH: mockInitState,
    REACT_APP_JOAL_CONF_ENDPOINT: joalConfigEndpoint,
    REACT_APP_MOCK_JOAL_CONF_PATH: mockJoalConfigPath,
  } = process.env;
  return [
    [configEndpoint, mockConfigPath, "frontConfig"],
    [initStateEndpoint, mockInitState, "InitState"],
    [joalConfigEndpoint, mockJoalConfigPath, "JoalConfig"],
  ];
};
