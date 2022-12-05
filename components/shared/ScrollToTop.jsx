import { ArrowUpIcon } from '@heroicons/react/24/outline'
import React from 'react'

const scrollToTop = () =>
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })

function ScrollToTop() {
  return (
    <div className='fixed bottom-0 translate-x-10 -translate-y-10'>
      <button
        className='btn btn-circle btn-outline'
        onClick={scrollToTop}
      >
        <ArrowUpIcon className='h-6 w-6' />
      </button>
    </div>
  )
}

export default ScrollToTop
