import supabase from './supabase';

/** MUTATING REMOTE SERVER STATE
 * So we learned how to fetch and store data in the cache using the useQuery hook
 * but now it's time to learn how to also mutate our remote server state
 * so here we will learn how to use the power of React query to delete a cabin
 * and automatically rerender the UI
 *
 * 1) First we need to get into the apiCabins.js file
 * as from here we interact with our cabin's api
 *
 * i) let's create a function called
 * * deleteCabin(id)
 * which will take in an id that ill delete the cabin and this function
 * will also be an async function, so from here you will get your row
 * deleteing code
 * ! fig: 1
 * paste that code in your deleteCabin function, his code can be written by
 * hand or copy paste it's upto you
 * ! fig: 2
 * so what this does is to again take our supabase client which we created earlier
 * ! fig: 2.1
 * then from here it will select the cabins table
 * and it will delete from there
 * and ofcourse not everything should be deleted from there
 * there we need to tell the supabase wht to delete
 * so in .eq we select the row that we want to delete
 * and that row has id coloumn comma, equal to id we pass in here
 * by paramters
 * ! fig: 2.2
 * let's now add error handling and return the data
 * ! fig: 3
 * Now if we try this code, nothing will happen do you know why?
 * well that's because we have activated RLS on this row remember?
 * So in RLS policies you can see here that only reading data is allowed but nothing else
 * ! fig: 4
 * so if we want users to be able to delete we would require to create a new policy
 * for that, so click on new policy, lets again use the first tempelate, for now
 * we will temporarily allow everyone to be able to delete
 * ! fig: 5
 * , how ever later on we will chnage this policy to only allow logged in users
 * authenticated users to delete cabins and same will be true for insert, update
 * and delete
 * So now review and save policy
 * ! fig: 5.1
 * Now let's add some more ros in our data base and notice as soon as we come back
 * to our tab notice how immediately our page refetches the data, so react query
 * here immediately makes data stale so that means whenever we come back to
 * this tab refetching will happen, so because of that we automatically and immediately
 * got the cabins that we just created and this is really really nice and handy
 * ! fig: 5.2x
 *
 * ii) Now let's make this delete button work
 * so that delete btn is inside the cabin row, so let's use react query
 * in here this CabinRow to make this work. so to do mutation we use the
 * * useMutation() hook
 * then in here we need to pass in an object
 * a) first element should be mutation function and this is the function that React
 * query will call and so let's make this an arrow function that will receive the id
 * and that will call then deletCabin function that we just created ith the id
 * no that's enough t make this work, so all we need to do now is save the result
 * of useMutation, but let's immediately destructure it, so we will again here get
 * isLoading and then what we also get is the mutate function basically a callback function
 * that we can connect with the button in this case
 * ! fig: 6
 * let now pass an click event on the button and no that should work
 * ! fig: 7
 * and that works, but we need to reload our page to update the Ui
 * so what we need to do is invalidate the cache as soon as the mutation is done
 * for that we can specify the
 * * onSuccess callback // in useMutation
 * so this onSuccess accepts an function, so here we can basically tell
 * React query what to do as soon as the mutation was successful, well we
 * basically want to refetch the data here in this situation and the way
 * this works in react query is by invalidating the cache, so in here we can do that
 * manually by clicking this
 * ! fig: 8
 * so if i click here it fetches again and then the data becomes stale
 * right away, so as the name says inValidate means the data is now invalid
 * or the Query is invalid and now the way we do this in our code is to
 * get the query client and call inValidate query on there
 * ! fig: 9
 * so that invalidates function actually needs to be called the QueryClient which is
 * right here,
 * ! fig: 9.1
 * but how do we get access to this query or query client instance?
 * well for that we have a special hook, a hook that will give us a query client
 * * useQueryClient
 * we will store it in queryClient variable and use it in onsuccess
 * function and here we can say to invalidateQueries and then we can
 * specify which exactly query or data should be invalidated, so we
 * specify the exactly same queryKey that we have there in our dev tools
 * ! fig: 10
 * now this will work...
 *
 * 2) now besides the onSuccess handler we also have the onError handler
 * so this one receives the error thrown inside te onSuccess function
 * so it receives it as an argument and then we can do anything we want with this
 * ! fig: 12
 */

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
