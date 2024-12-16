export const useUIStore = defineStore("ui", () => {
  // const showModal = ref(false);
  const showKeyManager = ref(false);
  const showDebug = ref(false);
  const showSettings = ref(false);
  const showHelp = ref(false);
  // chat settings
  const showIntroHeader = ref(true);
  const showQuickStartAction = ref(true);
  const engagedMessageMode = ref(false);
  // settings
  const theme = ref("light");
  // sidebar
  const hideSidebar = ref(false);
  const smallSidebar = computed(() => {
    return hideSidebar.value || engagedMessageMode.value;
  });

  // flows
  const showFlowCreator = ref(false);
  const isFlowsLoading = ref(true);

  return {
    isFlowsLoading,
    showKeyManager,
    showDebug,
    showSettings,
    showHelp,
    showQuickStartAction,
    showIntroHeader,
    hideSidebar,
    smallSidebar,
    engagedMessageMode,
    theme,
    showFlowCreator,
  };
});
