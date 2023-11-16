/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getCabins } from '../../services/apiCabins';
import CabinRow from './CabinRow';

/** FETCHING DATA USING REACT QUERY
 * So now instead of manually fecthing data from the useEffect()
 * we will now let React Query do this work
 * ! fig: 1
 *
 * let's first create a CabinTable component
 * ! fig: 2
 * let's now immediately import it in cabins component using Row component we created
 * ! fig: 3
 *
 * 1) Now it's time to use React query in CabinTable, So the most iport function
 * we will be using all the time is he
 * * useQuery() hook
 * i) in this we can pass in queryKey, this will uniquely identify the data that we
 * are going to query here, this can be a complex array or an array with string
 * but it needs to be an array remember that. In this case we have passed in
 * and array like this:
 * ! fig: 4
 * we will soon see this cabin in our react query dev tools, and again this is what
 * identifies each data and so later if we would use query again on another page
 * with this exact 'cabin' key then the data would be read from cache as we learned
 * at the beginning
 * ii) next is the query function, and this is the function which name says is responsible
 * for actually quarying for basically fetching the data from the api, now what's
 * important here is that the function we specify here needs to return an promise,
 * so we can simply use the fetch api here and then do some request to the URL here
 * * queryFn: fetch('some url here')
 * but how ever this is not we are going to do, instead we will use our already
 * created function, so this getCabins function is an async function
 * ! fig: 5
 * and therefore it returns an promise, and hen this promise is resolved it
 * will return a resolved data here, so that's how promises and async await
 * works and this will be the data that is gonna be stored in the cache,
 * so let's specify that function and we are done, and as it will return something
 * and let's check that out what it is in to our console
 * ! fig: 6
 * we also get some other kind of things
 * ! fig: 6.1
 * But for now we can use this one
 * ! fig: 6.2
 * as it has multiple states, loading and success.
 * or else we can try isLaoding wich was true at beginning.
 * So let's destructure some important pieces of data we think might beuse full
 * i) isLaoding
 * ii) data, renamed as cabins
 * iii) error
 * ! fig: 7
 * now let's immediately start using these things which we are getting from React query.
 * let's use the isLoading with our custom spinnen and let's check if it works
 * ! fig: 8
 *
 * 2) Now lets use our custom styled components
 * ! fig: 9
 * now let's give them role of table and row
 * ! fig: 9.1
 * this is to make the html more accessible because these styled pieces we
 * made will function as a table but we haven't implemented them using the able html
 * but instead using this div and header
 * ! fig: 9.2
 * but by specifying role make sure that the browser knows that this should be a table
 * and a row and get the data from api and let's arrange it properly
 * ! fig: 10, 10.1
 * Next we need to do calculations with dates, so let's install that
 * * npm i date-fns
 * so this contains a ton of helper functions, it's a great way
 * of abstracting away the difficulties working with Js dates
 *
 * Another thing to be noted is let's set this stail to 0 seconds
 * ! fig: 11
 * now what this means?
 * it means that now the data will automatically become stale
 * so now the data is always invalid, so as soon as something changes
 * in the database and we come back it will immediately refetch that
 */

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

const CabinTable = () => {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ['cabin'],
    queryFn: getCabins,
  });

  return (
    <Table role='table'>
      <TableHeader role='row'>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>

      {cabins &&
        cabins.map((cabin) => <CabinRow cabin={cabin} key={cabin.id} />)}
    </Table>
  );
};

export default CabinTable;
