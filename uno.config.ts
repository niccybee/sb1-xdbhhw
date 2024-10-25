import { defineConfig, presetIcons, presetTypography } from "unocss";
import presetUno from "@unocss/preset-uno";
import { presetForms } from "@julr/unocss-preset-forms";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        gg: () => import("@iconify-json/gg/icons.json").then((i) => i.default),
      },
    }),
    presetTypography(),
    presetForms({
      strategy: "base",
    }),
  ],
  // Add any custom rules or shortcuts here
  shortcuts: [
    {
      btn: "rounded-md bg-white px-2 py-1 text-sm font-medium border-none hover:border-1 hover:border-gray-700",
      "btn-destructive": "bg-red-500 text-white px-2 py-1 rounded-sm",
      "btn-primary": "bg-blue-700",
      "btn-secondary": "bg-gray-200 text-gray-800",
      card: "rounded-lg border-1 border-gray-1",
      "card-dashboard":
        "bg-none hover:bg-white transition duration-200 cursor-pointer",
      input:
        "border-none bg-gray-100 rounded-sm px-2 py-1 focus:ring-2 focus:ring-blue-300",
      select:
        "rounded-full border-none bg-gray-100 px-2 py-1 focus:ring-2 focus:ring-blue-400",
      "modal-overlay":
        "fixed inset-0 z-10 bg-black opacity-50 transition-opacity duration-200",
      modal: "fixed inset-0 z-10 bg-white rounded-lg shadow-lg",
      gradient: "bg-gradient-to-r from-blue-800 to-indigo-400 ",
      "gradient-text":
        "bg-gradient-to-r from-blue-800 via-green-500 to-indigo-400 text-transparent bg-clip-text",
    },
  ],
});
