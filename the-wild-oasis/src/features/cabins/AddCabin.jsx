import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
const AddCabin = () => {
  const [isOpenModel, setIsOpenModal] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Add new cabin
      </Button>
      {isOpenModel && (
        <Modal onClose={() => setIsOpenModal((show) => !show)}>
          <CreateCabinForm />
        </Modal>
      )}
    </>
  );
};
export default AddCabin;
