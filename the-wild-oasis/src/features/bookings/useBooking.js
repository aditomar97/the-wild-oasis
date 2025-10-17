import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { getBooking } from "../../services/apiBookings";

export const useBooking = ({ id }) => {
  console.log(id);

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
    retry: false,
  });
  return { isLoading, booking, error };
};
