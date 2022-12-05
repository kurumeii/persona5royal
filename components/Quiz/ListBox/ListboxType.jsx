import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

import React, { Fragment } from 'react'
import ListOption from './ListOption.jsx'

function ListboxType({ selected, setSelected }) {
  return (
    <Listbox
      value={selected}
      onChange={setSelected}
    >
      <div className='relative w-full'>
        <Listbox.Button className='relative btn pr-11 w-full'>
          <span className='block truncate'>{selected.text}</span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronDownIcon
              className='h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='absolute max-h-40 w-full overflow-auto rounded-md bg-base-100 text-base py-1 shadow-lg ring-1 ring-pink-600 ring-opacity-5 focus:outline-none sm:text-sm z-30'>
            <ListOption />
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default ListboxType
