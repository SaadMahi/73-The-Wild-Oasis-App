import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import GlobalStyles from './styles/GlobalStyles';
import Account from './pages/Account';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Settings from './pages/Settings';
import Users from './pages/Users';
import AppLayout from './ui/AppLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

/** SETTING UP REACT QUERY
 * 1) installing react query
 * * npm i @tanstack/react-query
 * i) so library is called tanstack query because it also works in other frameworks
 * like valt or view, so the official name is not React query anymore.
 *
 * 2) Setup React Query
 * i) setting this up is similar to context api and redux
 * a) first we create a place where data lives in
 * b) we provide that to the application
 *
 * 3) in case of React query we set up the cache and the query client using
 * * new QueryClient() // imported from tanstack
 * i) store it into a variable
 * ii) in this we will pass in couple of options in objects {}
 * even though we won't be working with options but let's see how it works
 * a) so we will pass defaultOptions, then we specify options for our queries
 * and one queries we can experiment with for now is staleTime, So staleTime
 * is the time is basically the amount of time that the data in the cache
 * will stay fresh, so it will stay valid until it's refetched again, let's set
 * i to 1 min, which is 60 second into 1000 miliseconds.
 * And this is just one of the many many options that we can override,
 * so React query sets a feq quite aggressive defaults but as always
 * we can override them
 * ! fig: 1
 * iii) so now with this we have created our query client
 * which basically stes up the cache behind the scenes and so
 * ow its's tie to provide this to the applcation
 *
 * 4) We ant to provide our Query data to the entire application tree
 * so now we will make this query client a parent component of our
 * entire tree
 * i) so let's now use the
 * * <QueryClientProvider></QueryClientProvider>
 * and provide it with the actual client by specifying the client prop with
 * value {queryClient} which we created earlier
 * ! fig: 2
 *
 * 5) Another thing we can do is install the React query dev tools
 * * npm i @tanstack/react-query-devtools
 * as soon as we install this let's include another component
 * as the first child of the QueryProvider component
 * * <ReactQueryDevtools initialIsOpen={false} />
 * and when you import this make sure to remove these lines to make it work
 * ! fig: 3
 * Now clicking flower will open the React query dev tools
 * ! fig: 4
 * So for now we don't have anything in our cache therefore
 * it is completely empty
 */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to='dashboard' />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='account' element={<Account />} />
            <Route path='bookings' element={<Bookings />} />
            <Route path='cabins' element={<Cabins />} />
            <Route path='settings' element={<Settings />} />
            <Route path='users' element={<Users />} />
          </Route>

          <Route path='login' element={<Login />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
