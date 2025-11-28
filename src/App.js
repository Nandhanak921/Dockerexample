import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import React from 'react';
// import Getfront from './component/Getfront';
import Helloapi from './component/helloapi';
import Register from './component/register';
import Login from './component/login';
import BackRegistration from './component/Backregistration';
import BackLogin from './component/backlogin';
import Productshow from './component/productshow';
import Fileupload from './component/fileupload';
import Displayingimage from './component/displayingimage';
import Foodmenu from './component/Foodmenu';
import UserMenu from './component/usermenu';
import Student from './component/student';
import Studproject from './component/studproject';
import Chatsocket from './component/chatsocket';
import Greeting from './component/greeting';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        {/* <Route path='get' element={<Getfront/>}></Route> */}
        <Route path='hello' element={<Helloapi/>}></Route>
        <Route path='reg' element={<Register/>}></Route>
        <Route path='login' element={<Login/>}></Route>
        <Route path='back' element={<BackRegistration/>}></Route>
        <Route path='log' element={<BackLogin/>}></Route>
        <Route path='showproduct' element={<Productshow/>}></Route>
        <Route path='file' element={<Fileupload/>}></Route>
        <Route path='display' element={<Displayingimage/>}></Route>
        <Route path='menu' element={<Foodmenu/>}></Route>
        <Route path='usermenu' element={<UserMenu/>}></Route>
        <Route path='student' element={<Student/>}> </Route>
        {/* <Route path='project' element={<Studproject/>}></Route> */}
        <Route path='stu' element={<Studproject/>}></Route>
       <Route path='chat' element={<Chatsocket/>}></Route>
       <Route path='greet' element={<Greeting/>}></Route>
      </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
