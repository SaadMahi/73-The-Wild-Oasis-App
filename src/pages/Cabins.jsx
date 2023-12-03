import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import CreatCabinForm from '../features/cabins/CreateCabinForm';
import Button from '../ui/Button';
import { useState } from 'react';

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm((prev) => !prev)}>
          {!showForm ? 'Add new cabin' : 'Close Form'}
        </Button>
        {showForm && <CreatCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
