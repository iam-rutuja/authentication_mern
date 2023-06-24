import React, { useState } from 'react'
import MenuItems from './MenuItems'
import Menu from './menu'

const GalleryReact = () => {
  const [item, setItem] = useState(Menu)
  const filterItem = (catItem) => {
    const updateItem = Menu.filter((curElm) => {
      return (curElm.category === catItem)
    })
    setItem(updateItem)
  }
  return (
    <>
      {/* <h1 className='mt-5 text-center main-heading'>Search List</h1> */}
      <p className="text-center my-3 text-capitalize"><span>SEARCH LIST</span></p>

      <div className='menu-tabs container'>
        <div className='menu-tab d-flex justify-content-around'>
          <button className='btn btn-warning' onClick={() => filterItem('member')}>Members</button>
          <button className='btn btn-warning' onClick={() => filterItem('present')}>Presentation</button>
          <button className='btn btn-warning' onClick={() => filterItem('publish')}>Publish info</button>
          <button className='btn btn-warning' onClick={() => filterItem('paper')}>IEEE paper</button>
          <button className='btn btn-warning' onClick={() => filterItem('book')}>IEEE paper</button>

          <button className='btn btn-warning' onClick={() => setItem(Menu)}>All</button>
        </div>
      </div>
      <MenuItems item={item} />
    </>
  )
}

export default GalleryReact