import React from 'react'

const Navbar = ({filterItem, uniqueMenuList}) => {
  return (
    <>
        <nav className="restaurant-navbar">
            <div className="btn-group">
                {
                    uniqueMenuList.map((curElem)=>{
                        return(
                            <button className='btn-group--item' onClick={()=>filterItem(curElem)}>{curElem}</button>
                        )
                    })
                }
            </div>
        </nav>
    </>
  )
}

export default Navbar