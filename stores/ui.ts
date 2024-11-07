export const useUIStore = defineStore("ui", () => {
  // const showModal = ref(false);
  const showKeyManager = ref(false);
  const showDebug = ref(false);
  const showSettings = ref(false);
  const showHelp = ref(false);

  // const showSettingsModal = () => {
  //   showSettings.value = true;
  // };
  // const hideSettingsModal = () => {
  //   showSettings.value = false;
  // };
  // const showHelpModal = () => {
  //   showHelp.value = true;
  // };
  // const hideHelpModal = () => {
  //   showHelp.value = false;
  // };
  // const showKeyManagerModal = () => {
  //   showKeyManager.value = true;
  // };
  // const hideKeyManagerModal = () => {
  //   showKeyManager.value = false;
  // };
  // const showDebugModal = () => {
  //   showDebug.value = true;
  // };
  // const hideDebugModal = () => {
  //   showDebug.value = false;
  // };

  return {
    showKeyManager,
    showDebug,
    showSettings,
    showHelp,
  };
});
