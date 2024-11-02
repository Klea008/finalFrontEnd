import React , { useEffect } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import useUserStore from './stores/useUserStore';

import UserHome from './pages/UserHome'
import AdminHome from './pages/AdminHome'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import ListDetails from './pages/Lists Related/ListDetails';
import Discovery from './pages/Lists Related/Discovery';
import ListPreview from './pages/Lists Related/ListPreview';
import CreateNewList from './pages/Lists Related/CreateNewList';
import AddBooksToTheList from './pages/Lists Related/AddBooksToTheList'
import EditList from './pages/Lists Related/EditList';
import SingleBook2 from './pages/SingleBook2';
import Bookmark from './pages/Bookmark';
import ReadBooks from './pages/ReadBooks';

const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return <div>Loading...</div>; 
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<UserHome />} />
        <Route path='/admin' element={<AdminHome />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/books/:id" element={<SingleBook2 />} />
        <Route path="/lists" element={<ListPreview />} />
        <Route path="/lists/:id" element={<ListDetails />} />
        <Route path="/explore" element={<Discovery />} />

        <Route path="/list/create" element={<CreateNewList />} />
        <Route path="/list/add/:name" element={<AddBooksToTheList />} />
        <Route path="/list/update/:name" element={<EditList />} />

        <Route path="/bookmarks" element={<Bookmark />} />
        <Route path="/read" element={<ReadBooks />} />



        <Route path='*' element={<NotFound />} />
        <Route path="/login" element={!user ? (< Login />) :
          user.isAdmin === true ? (
            <Navigate to="/admin" />
          ) : (
            <Navigate to="/" />
          )
        }
        />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App