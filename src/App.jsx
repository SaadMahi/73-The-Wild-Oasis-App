import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Account from './pages/Account';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Settings from './pages/Settings';
import Users from './pages/Users';

/** REACT ROUTER
 * 1) install react router
 * * npm i react-router-dom
 *
 * 2) As we won't be using data fetching features in this application
 * therefore we can go back setting up our routes in declarative way
 * i) so first comes the <BrowserRouter></BrowserRouter>
 * ii) then within this comes the <Routes></Routes> which is the one that figures our that
 * which route matches the URL
 * iii) then for each route we will have one route element which will be self closing
 * elements untill they have child routes
 *
 * 3) next let's set the routes, also keep an default route for default route
 * use 'index' props to set default and use 'replace' to replace the URL in the
 * history stack and then just the route using 'to', so by using 'to' page
 * will be directed to that URL in 'to'
 * * <Navigatage replace to='dashboard' />
 * ! fig: 1
 */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate replace to='dashboard' />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='account' element={<Account />} />
        <Route path='bookings' element={<Bookings />} />
        <Route path='cabins' element={<Cabins />} />
        <Route path='login' element={<Login />} />
        <Route path='settings' element={<Settings />} />
        <Route path='users' element={<Users />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
