// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@nuxtjs/cloudinary",
    // '@prisma/nuxt'
    "nuxt-auth-utils",
    "@nuxt/eslint",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  runtimeConfig: {
    public: {
      uploadPreset: "",
      cloudinaryCloudName: "",
    },
    cloudinaryApiKey: "",
    cloudinaryApiSecret: "",
  },
});
