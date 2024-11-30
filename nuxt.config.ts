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
  cloudinary: {
    cloudName: process.env.NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    uploadPreset: process.env.NUXT_PUBLIC_UPLOAD_PRESET,
    apiKey: process.env.NUXT_CLOUDINARY_API_KEY,
  },
});
