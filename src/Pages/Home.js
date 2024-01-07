import React,{useEffect,useContext} from 'react';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';
import { Toaster } from 'react-hot-toast';

function Home(props) {

 
  
  return (
    <div className="homeParentDiv">
      <Header />
      <Banner />
      <Posts />
      <Footer />
      <Toaster/>
    </div>
  );
}

export default Home;
 
