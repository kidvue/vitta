// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  name: "custom",
  rules: {
    "vue/no-multiple-template-root": "off",
    "vue/multi-word-component-names": "off",
    "vue/html-self-closing": "off",
  },
});
