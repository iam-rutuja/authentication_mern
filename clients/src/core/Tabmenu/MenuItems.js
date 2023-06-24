import React from 'react'


const MenuItems = (props) => {
    return (
        <div className='menu-item container-fluid mt-5'>
            <div className='row'>
                <div className='col-11 mx-audo'>
                    <div className='row my-5'>


                        {
                            props.item.map((ele) => {
                                const { id, name, imgaes, decription, url,sub } = ele;
                                return (




                                    <div className='cards card-header item1 col-12 col-md-6 col-lg-6 col-xl-4' key={id}>
                                        <div className='card-body row Item-inside'>
                                            {/* for image  */}
                                            <div className='col-12 col-md-12 col-lg-4 img-div'>
                                                <img src={imgaes} alt={name} className='img-fluid' />
                                            </div>
                                            {/* menu item description */}
                                            <div className='col-12 col-md-12 col-lg-8'>
                                                <div className='main-title pt-4 pb-3'>

                                                <h5 class="card-title">{name}</h5>
                                                <p class="card-text">{decription}</p>

                                                    <h6 class="card-subtitle mb-2 text-muted">{sub}</h6>
                                                </div>

                                                <div className='meun-price-book'>
                                                    {/* <div className='price-book-divide'>
                                                 <h5>price : {price}</h5> */}
                                                    <ul className='list style-none'>

                                                        <a href={url}>
                                                            <button className='btn btn-primary' >Click!</button>
                                                        </a>

                                                    </ul>

                                                    {/* </div>
                                            </div> */}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MenuItems

