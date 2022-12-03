import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link.js'
import React from 'react'

function NavigateButton({ pageInfo }) {
  const { hasNextPage, hasPrevPage, nextArcana, prevArcana } = pageInfo
  return (
    <>
      {hasNextPage ? (
        <Link
          href={{
            pathname: '/confidants/[arcanaId]',
            query: { arcanaId: nextArcana },
          }}
          replace
        >
          <div className='fixed bottom-1/2 right-6'>
            <button className='btn btn-ghost btn-circle'>
              <ChevronRightIcon className='w-10 h-10' />
            </button>
          </div>
        </Link>
      ) : null}
      {hasPrevPage ? (
        <Link
          href={{
            pathname: '/confidants/[arcanaId]',
            query: { arcanaId: prevArcana },
          }}
          replace
        >
          <div className='fixed bottom-1/2 left-6'>
            <button className='btn btn-ghost btn-circle'>
              <ChevronLeftIcon className='w-10 h-10' />
            </button>
          </div>
        </Link>
      ) : null}
    </>
  )
}

export default NavigateButton
