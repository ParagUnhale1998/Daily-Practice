import React from 'react'

 const Searchbox = ({searchfield,searchChange}) => {
  return (
    <div className=''>
      <input className='input-Search' type="search" placeholder='search robots' onChange={searchChange}/>
    </div>
  )
}
export default Searchbox