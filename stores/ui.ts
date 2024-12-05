export const useUIStore = defineStore("ui", () => {
  // const showModal = ref(false);
  const showKeyManager = ref(false);
  const showDebug = ref(false);
  const showSettings = ref(false);
  const showHelp = ref(false);
  // new section
  const hideIntroHeader = ref(false);
  const hideQuickStartAction = ref(false);
  const engagedMessageMode = ref(false);
  const hideSidebar = ref(false);
  // settings
  const theme = ref("light");

  const smallSidebar = computed(() => {
    return hideSidebar.value || engagedMessageMode.value;
  });

  return {
    showKeyManager,
    showDebug,
    showSettings,
    showHelp,
    hideQuickStartAction,
    hideIntroHeader,
    hideSidebar,
    smallSidebar,
    engagedMessageMode,
    theme,
  };
});
