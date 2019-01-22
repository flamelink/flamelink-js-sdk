import flamelink from '@flamelink/sdk-app';

const settings = context => {
  // If any bootstrapping is required, do it here

  return {
    setEnvironment: env => {
      context.env = env;
      return env;
    },
    getEnvironment: () => context.env,
    setLocale: locale => {
      context.locale = locale;
      return locale;
    },
    getLocale: () => context.locale,
    getGlobals: () => {},
    getImageSizes: () => {},
    getDefaultPermissionsGroup: () => {}
  };
};

export default flamelink.registerModule('settings', settings);
