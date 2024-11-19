import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useCookies } from "next-client-cookies";

interface FormSubmitParams {
  endpoint: string;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useFormSubmit = ({
  endpoint,
  onSuccess,
  onError,
}: FormSubmitParams) => {
  const cookies = useCookies();
  const token = cookies.get("authToken");
  const headers = {
    "Content-Type": "multipart/form-data",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // POST, PATCH 모두 지원
      await Promise.any([
        axios.post(endpoint, formData, {
          headers,
          withCredentials: true,
        }),
        axios.patch(endpoint, formData, {
          headers,
          withCredentials: true,
        }),
      ]);

      onSuccess?.();
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError && err.response?.data?.message
          ? err.response.data.message
          : "Submit Failed";
      setError(errorMessage);
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, handleSubmit };
};
