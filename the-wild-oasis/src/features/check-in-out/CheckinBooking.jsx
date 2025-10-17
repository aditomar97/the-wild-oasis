import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import CheckBox from "../../ui/Checkbox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import { useSetting } from "../settings/useSettings";
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmpage, setConfirmPage] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const moveBack = useMoveBack();
  const { bookingId } = useParams();
  const { booking, isLoading } = useBooking({ id: bookingId });
  const { settings, isLoading: isLoadSettings } = useSetting();
  useEffect(() => setConfirmPage(booking?.isPaid ?? false), [booking]);
  const { checkin, isCheckingIn } = useCheckin();
  const optionalBreakfastPrice =
    settings?.breakfastPrice * booking?.numNights * booking?.numGuests;
  console.log(optionalBreakfastPrice, booking);

  function handleCheckin() {
    if (!confirmpage) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: booking.totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  console.log(booking?.hasBreakfast);

  const isWorking = isCheckingIn || isLoading;
  if (isWorking) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!booking?.hasBreakfast && (
        <Box>
          <CheckBox
            checked={addBreakfast}
            // disabled={confirmpage || isCheckingIn}
            onChange={() => {
              setAddBreakfast((page) => !page);
              setConfirmPage(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for ${optionalBreakfastPrice} ?
          </CheckBox>
        </Box>
      )}

      <Box>
        <CheckBox
          checked={confirmpage}
          disabled={confirmpage || isCheckingIn}
          onChange={() => setConfirmPage((page) => !page)}
          id="confirm"
        >
          I confirm that {booking?.guests?.fullName} has paid the total amount{" "}
          {!addBreakfast
            ? formatCurrency(booking?.totalPrice)
            : `${formatCurrency(
                booking?.totalPrice + optionalBreakfastPrice
              )} ${formatCurrency(booking?.totalPrice)}+${formatCurrency(
                optionalBreakfastPrice
              )}`}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmpage || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
