/* eslint-disable no-unused-vars */
import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

/** REACT HOOK FORM
 * So where react hook shines the most is in form error validation,
 * so let's now learn how to use those feature to our advantage
 *
 * 1) So let's do the form validation, so we can add some more
 * stuff to this register function
 * ! fig: 1
 * so in particular as an second argument pass in an object for validation
 * and in here we can do many many things
 * ! fig: 1.1
 * let's do some, first one is required property and on this we can set an error msg
 * i) required: 'This field is required'
 * so let's grab this and paste in every input as all of these is required, we
 * will take care of the image later justleave it as it is
 * ! fig: 2
 * Now before we test this, what we need to know is that, this handle submit function
 * ! fig: 3
 * is called each time we attempt to submit the form and at that point all our
 * validations will be executed, so all of these required we passed in will
 * be checked and in case even if there is one error encountered then this handleSubmit
 * will not call the onsubmit function here but instead it will call the second
 * function that we will pass in here, so let's call it onError, and this
 * error function instead of data receives an actual error in parameter when defined it
 * as errors
 * ! fig: 3.1
 * Let's try this, leave some input fields empty and log to the console
 * ! fig: 4
 * and we get those errors in these console and onError function is called instead of
 * onSubmit function, so this is the most basic validation
 *
 * ii) next we can set the minimum value or max value that must be filled
 * ! fig: 5
 *
 * iii) next condition we can work on is the discount price
 * we cannot keep the price of 100 and discount of 200, the discount
 * must we lower than the price
 * ! fig: 6
 * a) and in this situation we can write our own custom validation function
 * and for that we specify 'validate': and then in this we rite a callBack function
 * and this callback gets as an argument the current value that is currently
 * being input in the field and then here we can write any kind of logic we want
 * and as soon as that logic returns true then the field will be correctly validated
 * and we specify an || logic if the value is not true return message
 * ! fig: 7
 * but ofcourse we don't want to compare he value with 100, as regular
 * price can be anything not 100, so how will we get this other input
 * fields price in this input field?
 * ! fig: 8
 *
 * well there's a nice function that comes in here with the useForm which
 * is called getValues
 * ! fig: 9
 * so in place of 100 we can call this function, so
 * after calling this it returns an object of values and from there
 * we can get the regularPrice
 * ! fig: 10
 * so now the value should be equal or greater than the regular price.
 * and that works good...
 * ! fig: 11
 *
 * 2) Now our next task is how do we get these error messages from our
 * console.log into our application, well once again we can get these
 * errors from the useForm hook by using
 * * formState
 * and from this object we can read the errors property
 * ! fig: 12
 * so as we can see these errors look exactly as we saw previously.
 * and so now in the input field we can use the Error style component
 * and display the error message incase there is an error
 * ! fig: 13
 * and that's it...
 *
 * 3) now there is alot of repetition of code let's create a reusable component
 * accordingly
 */

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  console.log(getValues().regularPrice);

  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({ queryKey: ['cabin'] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  const onError = (errors) => {
    // console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isCreating}
          {...register('name', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isCreating}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isCreating}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isCreating}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={errors?.description?.message}
      >
        <Textarea
          type='number'
          id='description'
          disabled={isCreating}
          defaultValue=''
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput id='image' accept='image/*' />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add Cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
