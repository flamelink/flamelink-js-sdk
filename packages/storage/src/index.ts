import flamelink from '@flamelink/sdk-app';

const storage = context => {
  // If any bootstrapping is required, do it here

  return {
    upload: () => {},
    getFolders: () => {},
    getFiles: () => {},
    getFile: () => {},
    getURL: () => {}, // TODO: Consider replacing with `add`
    deleteFile: () => {},
    getMetadata: () => {},
    updateMetadata: () => {},
    ref: () => {}
  };
};

export default flamelink.registerModule('storage', storage); // TODO: consider aliasing as "media" as well
