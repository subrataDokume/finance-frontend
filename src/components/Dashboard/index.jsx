import React from 'react'
import CategoryChart from './categoryChart'
import CategoryPieChart from './categoryPieChart'
const index = () => {
  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 container justify-center items-center w-full min-h-[90vh]'>
      <CategoryPieChart/>
      <CategoryChart/>
    </div>
  )
}

export default index