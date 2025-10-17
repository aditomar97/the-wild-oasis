import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Empty from "../../ui/Empty";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate, useParams } from "react-router-dom";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "../check-in-out/useDeleteBooking";
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { id } = useParams();
  const { isLoding, booking, error } = useBooking({ id });
  const { checkout, isCheckingout } = useCheckout();
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { deleteBooKing, isDeleting } = useDeleteBooking();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if (isLoding) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[booking?.status]}>
            {booking?.status?.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      {booking !== undefined && <BookingDataBox booking={booking} />}

      <ButtonGroup>
        {booking?.status === "unconfirmed" && (
          <Button
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/checkin/${id}`)}
          >
            Check In
          </Button>
        )}
        {booking?.status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(id)}
            disabled={isCheckingout}
          >
            Check out
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete Booking</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              onConfirm={() =>
                deleteBooKing(id, {
                  onSettled: () => navigate(-1),
                })
              }
              resourceName="booking"
            />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
