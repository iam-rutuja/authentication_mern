import React from 'react'

const CatMenu = ({ filterItem, catItem }) => {
  return (
    <>
      <div className='menu-tabs container'>
        <div className='menu-tab d-flex justify-content-around'>

          {
            catItem.map((ele, index) => {
              return <button className='btn btn-warning' key={index}
                onClick={() => filterItem(ele)}> {ele}   </button>
            })
          }


          {/* <button className='btn btn-warning' onClick={()=> filterItem('breakfast')}>Breakfast</button>
                         <button className='btn btn-warning' onClick={()=> filterItem('lunch')}>Lunch</button>
                         <button className='btn btn-warning' onClick={()=> filterItem('eve')}>Evening</button>
                         <button className='btn btn-warning' onClick={()=> filterItem('dinner')}>Dinner</button>
                         <button className='btn btn-warning' onClick={()=> setItem(Menu)}>All</button> */}

        </div>
      </div>
    </>
  )
}

export default CatMenu