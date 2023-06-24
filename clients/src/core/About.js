import React from 'react'
import Layout from './Layout';
import GalleryReact from './Tabmenu/GalleryReact';

const About = () => {
    return (
        <Layout>
        <div className="container">
            <div className="row w-100 d-flex justify-content-center align-items-center main_div">
            {/* <div className="col-12 col-md-8 col-xxl-5"> */}
                <div className="card py-3 px-2">
                    <p className="text-center my-3 text-capitalize"><span>About us</span></p>
                     
                    {/* <h1>Hello , I am About {props.name}Page</h1> */}

                <GalleryReact/>

                </div>
            {/* </div> */}
            </div>
        </div>
    </Layout>
    );
}

export default About