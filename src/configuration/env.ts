export const get_env: () => string[] = () => {
  const {
    REACT_APP_CONFIG_ENDPOINT: configEndpoint,
    REACT_APP_CONFIG_PATH: mockConfigPath,
  } = process.env;
  return [configEndpoint || "", mockConfigPath || ""];
};
