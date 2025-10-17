import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
export function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  //1
  const numBookings = bookings?.length;

  // total sales

  const sales = bookings?.reduce((acc, curr) => acc + curr.totalPrice, 0);

  //toal checkin
  const checkins = confirmedStays?.length;

  //Occupancy rate
  const occupancyRate =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="blue"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRate * 100) + "%"}
      />
    </>
  );
}
