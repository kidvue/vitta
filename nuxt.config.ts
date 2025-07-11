import {
  transformerDirectives,
  transformerCompileClass,
  transformerVariantGroup,
} from "unocss";
import uncomponents from "unplugin-vue-components/vite";
import unicons from "unplugin-icons/resolver";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["@unocss/reset/tailwind.css"],
  modules: [
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxt/eslint",
    "@unocss/nuxt",
    "unplugin-icons/nuxt",
  ],
  unocss: {
    theme: {
      colors: {
        vue: { green: "#42b883", navy: "#35495e" },
      },
    },
    transformers: [
      transformerDirectives(),
      transformerCompileClass(),
      transformerVariantGroup(),
    ],
  },
  srcDir: "src",
  ssr: !process.env.TAURI_DEV_HOST,
  devServer: { host: process.env.TAURI_DEV_HOST || "localhost" },
  vite: {
    clearScreen: false,
    envPrefix: ["VITE_", "TAURI_"],
    server: {
      strictPort: true,
    },
    plugins: [
      uncomponents({
        resolvers: [
          unicons({
            prefix: "",
            strict: true,
          }),
        ],
        dts: true,
      }),
    ],
  },
  fonts: {
    families: [{ name: "Inter", weights: [300, 400, 500, 600, 700] }],
  },
});
