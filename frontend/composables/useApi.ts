export const useApi = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBaseUrl || config.public.apiBase || 'http://localhost:3001';

  const fetchHello = async () => {
    return await $fetch<string>(`${apiBase}/api/hello`);
  };

  const fetchAbout = async () => {
    return await $fetch<{
      name: string;
      title: string;
      experience: string[];
    }>(`${apiBase}/api/about`);
  };

  return {
    fetchHello,
    fetchAbout
  };
};
