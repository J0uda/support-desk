import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { createTicket, reset } from '../features/tickets/ticketSlice';

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState('iPhone');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate('/tickets');
    }

    dispatch(reset());
  }, [isError, isSuccess, navigate, message, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ product, description }));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create new Ticket</h1>
        <p>Please fill out the form below</p>

        <section className='form'>
          <div className='form-group'>
            <label htmlFor='name'>Customer Name</label>
            <input type='text' value={name} className='form-control' disabled />
          </div>
          <div className='form-group  '>
            <label htmlFor='email'>Customer Email</label>
            <input
              type='email'
              value={email}
              className='form-control'
              disabled
            />
          </div>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='product'>Product</label>
              <select
                name='product'
                id='product'
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              >
                <option value='iPhone'>iPhone</option>
                <option value='Macbook pro'>Macbook Pro</option>
                <option value='iMac'>iMac</option>
                <option value='iPad'>iPad</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Description of the issue</label>
              <textarea
                name='description'
                id='description'
                placeholder='Description...'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className='form-group'>
              <button className='btn btn-block'>Submit</button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
}

export default NewTicket;
