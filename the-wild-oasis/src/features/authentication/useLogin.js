import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading: isLogging, mutate: logging } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),

    onSuccess: (data) => {
      toast.success("Logged In Successfully");
      queryClient.setQueryData(["user"], data?.user);
      navigate("/dashboard", { replace: true });
    },

    onError: (err) => {
      console.log("Error", err);

      toast.error(`${err?.message}`);
    },
  });
  return { isLogging, logging };
};
