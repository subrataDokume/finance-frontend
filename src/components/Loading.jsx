import React from 'react'

const Loading = () => {
  return (
    <div className='w-full min-h-[90vh] flex justify-center items-center'>
        <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-4 border-t-foreground" />
    </div>
  )
}

export default Loading