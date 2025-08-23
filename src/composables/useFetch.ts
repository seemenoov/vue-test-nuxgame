import { ref } from "vue";

export function useFetch<T = any>() {
  const BASE_URL = "https://jsonplaceholder.typicode.com";

  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(false);

  const fetchData = async (url: string, options?: RequestInit) => {
    loading.value = true;
    error.value = null;

    try {
      const res = await fetch(`${BASE_URL}${url}`, options);
      if (!res.ok) throw new Error(`Response Error: ${res.status}`);
      data.value = (await res.json()) as T;
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  return { data, error, loading, fetchData };
}
