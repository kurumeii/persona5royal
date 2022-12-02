import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link.js'

export default function SharedHeader() {
  return (
    <>
      <nav className='flex flex-col w-full z-10 min-h-16 max-h-32'>
        <div className='navbar bg-base-100 h-28'>
          <div className='flex-none px-2 mx-2'>
            <Link
              href='/'
              replace
            >
              <button className='btn btn-ghost gap-2'>
                <ArrowLeftIcon className='h-6 w-6 ' />
                Back to hompage
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
