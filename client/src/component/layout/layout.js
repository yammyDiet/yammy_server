import React from 'react';
import Footer from "./footer";
import Header from "./header";
import {Link} from "react-router-dom";

const Layout = () =>{
    return (
        <div className='layout'>
            <Header/>   
            <layout>
            <main className='main'>
            <div>
                <Link to='/sortDiet' >식단검색</Link>
            </div>
            <div><a href='#' className='board_box'>커뮤니티</a></div>
            </main>
            </layout>
            <Footer/>
        </div>
    )
}

export default Layout;