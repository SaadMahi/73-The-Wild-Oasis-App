import supabase from './supabase';

/** CREATE NEW CABINS (submit form data to supabase)
 * So as our form functionality is now ready let's create the new cabins
 *
 * 1) We need to create that function in our services to do that in apiCabins.js
 * i) let again create a new policy, so our users can create new cabins
 * ! fig: 1
 * a) select the first template
 * b) set the operation to INSERT
 * c) and set check expression to true and click review
 * ! fig: 1.1
 * d) save policy
 * ii) also create an update policy same way we created the above
 * iii) just write true in check expression
 * done...
 * ! fig: 2
 * lets now go to api docs
 * copy the insert code from here:
 * ! fig: 3
 * and paste it here
 * ! fig: 4
 *
 * also let's add the error handling and data returning method and pass in it our form
 * data as newCabin
 * ! fig: 4.1
 * and well this formData is gonna work because we have all these table data's name of
 * these id's we made
 * ! fig: 4.2
 * so the data we will be returning has the exact shape of the data that we need to
 * pass in here into supabase when we want to create the new cabin.
 *
 * 2) Now everything's set and now we will use the
 * * useMutation() hook
 * so it is a react query mutation as peviously discussed to mutate data
 * on the server from here, so this returns us an object
 * i) mutate function
 * ii) isLoading state
 * a) and here we will pass in the mutate function as mutationFn:
 * and this is going to be 'createCabin' make sure to import this
 * b) also lets call the onSuccess and onError handlers like we did
 * previouslly while deleting the row
 * c) also we need to takecare of when the mutation happens, like
 * when the cabin has been created we need to make sure that appears
 * in the Ui and for that we will have to invalidate the cabins query again
 * as we learned below so that cabins data will be refetched.
 * i) and to play with this we will need to bring back our
 * * useQueryClient()
 * ! fig: 5
 *
 * 3) Once all done let's use the mutate function and the isLoading state
 * and that's really simple to do
 * ! fig: 6
 * and that's it... everything works smooth and looks like magic ✨
 */

export async function createCabin(newCabin) {
  const { data, error } = await supabase
    .from('cabins')
    .insert([newCabin])
    .select();

  if (error) {
    console.error(error);
    throw new Error(`cabins could not be loaded`);
  }

  return data;
}

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error(`cabins could not be loaded`);
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error(`cabins could not be loaded`);
  }

  return data;
}
