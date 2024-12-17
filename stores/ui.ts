
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useUIStore = defineStore("ui", {
  state: () => ({
    showKeyManager: useStorage("ui:showKeyManager", false),
    showDebug: useStorage("ui:showDebug", false),
    showSettings: useStorage("ui:showSettings", false),
    showHelp: useStorage("ui:showHelp", false),
    showIntroHeader: useStorage("ui:showIntroHeader", true),
    showQuickStartAction: useStorage("ui:showQuickStartAction", true),
    engagedMessageMode: useStorage("ui:engagedMessageMode", false),
    theme: useStorage("ui:theme", "light"),
    hideSidebar: useStorage("ui:hideSidebar", false),
    showFlowCreator: useStorage("ui:showFlowCreator", false),
    isFlowsLoading: useStorage("ui:isFlowsLoading", true),
  }),

  getters: {
    smallSidebar: (state) => state.hideSidebar || state.engagedMessageMode,
  },
});
