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
import { Toaster } from 'react-hot-toast';

/** Displaying Toasts
 * So let's now display some nicely formated notifications which in the
 * world of web designing are called as toasts for some reason.
 *
 * 1) So to do that we require another 3rd party library
 * * npm i react-hot-toast
 *
 * 2) Once installed we need then we will actually need to set that up
 * in our app component
 * ! fig: 1
 * similar to thse globalStyles and devTool
 * we require to add yet another self closing component here
 * so let's store it at downside in order not to clutter our markup too much
 * ! fig: 2
 * and this component is called Toster as it will produce toasts and
 * toasts are the names we give to these notifications we see, so it
 * receives a few props, you can look for these props in DOCS, for noew lets
 * look at the props
 * i) position
 * in this we will give the value where we want to display it
 * * position='top-center'
 * ii) gutter
 * this is the space controller between the window and the toaster
 * let keep it 12
 * * gutter='12'
 * iii) containerStyle
 * here we need to specify an object of style our css styles,
 * let's give it a margin of 8px
 * iv) toastOptions
 * in this also we specify an object and in this we can define
 * for how long a success toast will stay on the screen so we will use
 * 'success' then inside 'success' we will use 'duration' and set it to 3secs as 3000miliseconds
 * a) then we can also do the same for error, let's make it abit longer
 * gie it 5secs so user can see it and observe error for long.
 * b) we can also define styles here using style{}
 * c) and finally with this we are ready to use our toaster
 * ! fig: 3
 * iv) let's now replace these alerts
 * ! fig: 4
 * with toast function and this is the fuction which we can import from React hot toast
 * and then on here we can create a bunch of different toasts, so let's use
 * error and success toast here
 * ! fig: 5
 * now let's try an error let's edit Supabase url to get error
 * ! fig: 6
 */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /* staleTime: 60 * 1000, */
      staleTime: 0,
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
      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{
          margin: '8px',
        }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
