import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';

const AddCabin = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

/* const AddCabin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsModalOpen((prev) => !prev)}>
        {!isModalOpen ? 'Add new cabin' : 'Close Form'}
      </Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {<CreateCabinForm onCloseModal={() => setIsModalOpen(false)} />}
        </Modal>
      )}
    </div>
  );
}; */

export default AddCabin;
