import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useCookies } from "next-client-cookies";

interface FormSubmitParams {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useFormSubmit = ({ onSuccess, onError }: FormSubmitParams) => {
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
      // (테스트) 의도적 2초 지연
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("컬렉션 data", Object.fromEntries(formData.entries()));
      // 실제 요청 시
      await axios.post("/api/collections", formData, {
        headers,
        withCredentials: true,
      });

      console.log(
        "컬렉션 생성 Success",
        Object.fromEntries(formData.entries())
      );

      onSuccess?.();
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError && err.response?.data?.message
          ? err.response.data.message
          : "컬렉션 제출 Failed";
      setError(errorMessage);
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, handleSubmit };
};
