/* eslint-disable no-unused-vars */

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

/** IMAGE/FILE UPLOADS ON SUPABASE BUCKET
 * Now we will be aking this part of form to work
 * ! fig: 1
 *
 * 1) so let's start with our step no. 1 like always, registering the field
 * i) let call it image(id)
 * ii) set it's type to 'file'
 * ! fig: 2
 * iii) let's checkout this FileInput component once
 * ! fig: 3
 * as we can see it's just an another input element but if
 * we want to pass in attributes to this input element
 * we can do that like this:
 * ! fig: 4
 * so this styled component will be reusable
 *
 * so now let's select a cabin photo now
 * ! fig: 5
 * so let's fill in the form, submit and check on the log
 * ! fig: 6
 * we see that it does contains the image
 * so now we have to pass this into our mutate function
 * ! fig: 7, fig: 7.1
 *
 * 2) Now let's go to our createCabin function in apiCabins.js
 * as this is where we will be uploading our image
 * i) so first of all we create the cabin  and only if that is successful
 * ii) then we upload the image
 * ! fig: 8
 * iii) now what we still need to do is specify the image path in this [newCabin]
 * that we create, because in our supabase data in our first row we already have
 * an image but the only way we get the image here is with the file name
 * ! fig: 9
 * from our bucket, so with this file name we connect the cabin row ith the corresponding
 * cabin image. So let's grab this URL from here as we will need this
 * ! fig: 9.2
 * So we not only need to upload the image but also specify the image name
 * and path to the image in the bucket right here in the [newCabin] that we insert
 * a) Our fist step will to to create a URL like this we just copied,
 * it contains the path to the bucket along with a unique cabin name
 * ! fig: 10
 * i) so we need to make sure the cabin image name stays unique
 * ! fig: 11
 * here we have used Math.random to generate randoms numbers to keep it unique
 * and attached it with image.
 * but here we could get in trouble, if by change this cabin image name
 * contains any slashes (/) then supabase will create folders based on that
 * and we ofcourse don't want that, so let's replace all the slashes with nothing
 * ! fig: 11.1
 * ii) now let's create the image path, this is what we will store inside
 * of the cabin row.
 * now let's grab this supabaseURL which we already have in supabase.js
 * ! fig: 11.2, 11.3
 * and then we spread and provide the image path
 * ! fig: 12
 * So that's the first part which is finished now
 *
 * 3) Now we want to upload the image itself, so now we are interested in this
 * uploading a file
 * ! fig: 13
 * now here they say that RLS is required to upload a file
 * ! fig: 13.1
 * and we haven't done this yet, so let's do that, so we need to go to bucket,
 * policies then add new policy
 * ! fig: 13.2
 * i) select full customization
 * ii) tick all Allowed operations
 * iii) give policy name as: Allow all operations
 * iv) click review
 * v) save policy
 * ! fig: 13.3
 * now let's see how we can upload the file as we have now completed
 * the RLS process
 * ! fig: 14
 * so let's grab all of this, and place that here
 * ! fig: 14.1
 * vi) let's now modify it and we are done
 * ! fig: 15
 * this is how we upload images to supabase
 *
 * 4) Now the final thing we want to do is to prevent new cabin from being created
 * in case that this file didn't upload correctly, so we can delete the cabin
 * if there is an error uploading the image
 * ! fig: 16
 * also let's throw an error message
 * ! fig: 17
 * Finally we are done, let's try adding a cabin and we get our cabin sucessfully
 * ! fig: 18
 * and if we check in our bucket we see that image
 * ! fig: 19
 */

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  // //console.log(getValues().regularPrice);

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
    // //console.log({ ...data, image: data.image[0].name });
    mutate({ ...data, image: data.image[0] });
  };

  const onError = (errors) => {
    // //console.log(errors);
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
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: 'This field is required',
          })}
        />
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
