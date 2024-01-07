import React from 'react'
import {BrowserRouter as Router , Route} from 'react-router-dom'
import Home from '../Pages/Home'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import CreatePost from '../Pages/CreatePost'
import ViewPost from '../Pages/ViewPost'
import ViewMore from '../Pages/ViewMore'
import Wishlist from '../Pages/Wishlist'
import View from '../Components/View/View'




function MainRoutes() {
    return (
       <Router>
           <Route exact path="/">
               <Home/>
           </Route>
           <Route path="/signup">
               <Signup/>
           </Route>
           <Route path="/login">
               <Login/>
           </Route>
           <Route path="/create">
               <CreatePost/>
           </Route>
           <Route path="/productDetails/:id">
               <View/>
           </Route>
           <Route path="/viewmore">
               <ViewMore/>
           </Route>
           <Route path="/wishlist">
               <Wishlist/>
           </Route>
           
       </Router>
    )
}

export default MainRoutes
