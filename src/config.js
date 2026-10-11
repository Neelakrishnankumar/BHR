// NEW--------------------------
let config = null;

export const loadConfig = async () => {
  if (config) return config;

  const hostedConfigUrl = process.env.REACT_APP_CONFIG_URL || "/config.json";
  // In development, hosted config is fetched through the dev-server proxy (src/setupProxy.js) to avoid CORS.
  const configUrl =
    process.env.NODE_ENV === "development" && /^https?:\/\//.test(hostedConfigUrl)
      ? "/remote-config.json"
      : hostedConfigUrl;
  const response = await fetch(`${configUrl}?v=${Date.now()}`);
  config = await response.json();
  console.log("CONFIG LOADED", config);
  return config;
};

export const getConfig = () => {
  if (!config) {
    throw new Error("Config not loaded yet");
  }
  return config;
};




// OLD-----------------------------
// let config = null;

// export const loadConfig = async () => {
//   if (config) return config;

//   const response = await fetch(`/config.json?v=${Date.now()}`);
//   config = await response.json();
//   console.log("CONFIG LOADED", config);
//   return config;
// };

// export const getConfig = () => {
//   if (!config) {
//     throw new Error("Config not loaded yet");
//   }
//   return config;
// };

