import { onKeyStroke } from "@vueuse/core";

export const useKeyboard = () => {
  onKeyStroke(["Control", "Space"], (e) => {
    console.log("Space + Enter", e);
  });
  onKeyStroke("a", (e) => {
    console.log("A Dude!");
  });
};
