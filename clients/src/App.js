import React from 'react'
import Layout from './core/Layout'


const App = () => {
  return (
    <>
      <Layout />
      <div className="container">
        <div className="row w-100 d-flex justify-content-center align-items-center main_div">
          <div className="col-12 col-md-20 col-xxl-10">
            <div className="card py-2 px-2">
              <p className="text-center my-3 text-capitalize"><span> Noble Approach to Locate Brain Tumor using Deep Convolution Technique</span></p>

              {/* <div className="division">
                <div className="row">

                  <div className="col-6 mx-auto">
                    <div className="inputBox">
                      <span className="main-heading">
                        ...
                      </span>
                    </div>
                  </div>
                </div>
              </div> */}


              <div className="col-6 mx-auto justify-content-center align-items-center" >
                <div className="inputBox">
                  <img src='images/brainn.jpg' className='img-fluid' />
                </div>
              </div>

             

               
                  {/* <h5 className="card-title">...</h5> */}
                  <p className="card-text">Nowadays, Tumors are considered to be the
                    second most common genesis of cancer, placing a lot of
                    patients' lives in danger.The development of aberrant brain
                    cells, some of which may turn cancerous, results in a brain
                    tumors. Deep
                    convolutional neural network networks have been
                    successfully used in image processing since their
                    development in 2012, according to academics. The 10th most
                    prevalent type of cancer condition among Indians in 2018
                    was determined to be brain tumors, and it is estimated that
                    approximately 24,000 people pass away from them each year.</p>

                    <button type="button" class="btn btn-link">
                    <a href="https://seer.cancer.gov/statfacts/html/brain.html" >Click here to learn more...</a>
                    </button>
                  
                           


                


                    
                 
          
              


            </div>
          </div>





        </div>
      </div>

    </>
  )
}

export default App