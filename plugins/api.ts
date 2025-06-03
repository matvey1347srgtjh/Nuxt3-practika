import { $fetch } from 'ofetch';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  const customFetch = $fetch.create({
    baseURL: apiBase
  });
  nuxtApp.provide('api', customFetch);
});
