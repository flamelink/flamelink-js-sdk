import flamelink from './app';

const settings = context => {
  // If any bootstrapping is required, do it here

  return {
    setEnvironment: env => {
      context.env = env;
      return env;
    },

    getEnvironment: () => context.env
  };
};

export default flamelink.registerModule('settings', settings);
