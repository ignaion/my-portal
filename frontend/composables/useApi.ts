export const useApi = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  const fetchHello = async () => {
    return await $fetch<string>(`${apiBase}/hello`);
  };

  const fetchAbout = async () => {
    return await $fetch<{
      name: string;
      title: string;
      experience: string[];
    }>(`${apiBase}/about`);
  };

  return {
    fetchHello,
    fetchAbout
  };
};