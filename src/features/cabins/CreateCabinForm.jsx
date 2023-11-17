/* eslint-disable no-unused-vars */
import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';

/** REACT HOOK FORM LIBRARY
 * This library can be used to greatly simplify handling forms
 * in React(SPA)
 *
 * 1) So we have our custom form
 * ! fig: 1
 * Let's set up the React hook form library
 * * npm i react-hook-form
 *
 * 2) So once installed you can notice on the form
 * we haven't made any inputs a controlled element using useState
 * ! fig: 2
 * and now we won't need to do that as we will handle everything
 * about this form using this library that we just installed
 *
 * i) so we will call the
 * * useForm hook()
 * this will return us few functions that can be used and the most fundamental one
 * is the register function and the handle submit function.
 * a) so the way this regiter works is simply in input element go into js mode
 * spread the result of calling register, and in the argument we pass in the name
 * of the field, let's just call it name which is exactly same as the id of this
 * input
 * ! fig: 3
 * b) let's observe this input filed in our component tree
 * and we find out that we get an onBlur and onChange function on it,
 * ! fig: 4
 * So all of these are placed by React hook form, simply by this marked
 * red, ok so let's place this in other input elements too.
 * c) so we are done with the step 1 to make the React form work, so always
 * the first step is to register all the input fields that we actually want
 * React hook form to handle
 *
 * 3) And then the second part is to specify the onSubmit form here
 * and here we will call that handleSubmit function we received from the useForm()
 * and pass in our own onSubmit function and this will then be called with the actual
 * data, so the data from all fileds that we registered
 * ! fig: 5
 * let's fill in the form and log the data to the console
 * ! fig: 5.1
 */

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const { register, handleSubmit } = useForm();

  return (
    <Form>
      <FormRow>
        <Label htmlFor='name'>Cabin name</Label>
        <Input type='text' id='name' {...register('name')} />
      </FormRow>

      <FormRow>
        <Label htmlFor='maxCapacity'>Maximum capacity</Label>
        <Input type='number' id='maxCapacity' {...register('maxCapacity')} />
      </FormRow>

      <FormRow>
        <Label htmlFor='regularPrice'>Regular price</Label>
        <Input type='number' id='regularPrice' {...register('regularPrice')} />
      </FormRow>

      <FormRow>
        <Label htmlFor='discount'>Discount</Label>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='description'>Description for website</Label>
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          {...register('description')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='image'>Cabin photo</Label>
        <FileInput id='image' accept='image/*' />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button>Submit Cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
