import {
  transformerDirectives,
  transformerCompileClass,
  transformerVariantGroup,
} from "unocss";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["@unocss/reset/tailwind.css"],
  modules: ["@nuxt/icon", "@nuxt/fonts", "@nuxt/eslint", "@unocss/nuxt"],
  unocss: {
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
  },
  fonts: {
    families: [{ name: "Inter", weights: [300, 400, 500, 600, 700] }],
  },
});
