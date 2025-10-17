import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";
const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteBooKing } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteBooKing };
};

export default useDeleteBooking;
