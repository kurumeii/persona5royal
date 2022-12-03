import { HomeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link.js'
import React from 'react'
import SearchConfidant from './SearchConfidant.jsx'

function TopButtonGroup() {
  return (
    <>
      <div className='flex flex-1 m-10 justify-between'>
        <Link
          href='/confidants'
          replace
        >
          <button className='btn btn-ghost gap-2'>
            <XMarkIcon className='h-6 w-6 ' />
            Back to list
          </button>
        </Link>
        <SearchConfidant />
        <Link
          href='/'
          replace
        >
          <button className='btn btn-ghost gap-2'>
            <HomeIcon className='h-6 w-6 ' />
            Back to homepage
          </button>
        </Link>
      </div>
    </>
  )
}

export default TopButtonGroup
