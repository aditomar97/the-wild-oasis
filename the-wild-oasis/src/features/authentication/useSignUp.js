import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as singupApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useSinUp() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: singupApi,
    onSuccess: (user) => {
      console.log(user);

      toast.success(
        "Account successfully created! Please verify the /n new account from the user's email address "
      );
    },
  });
  return { isLoading, signup };
}
