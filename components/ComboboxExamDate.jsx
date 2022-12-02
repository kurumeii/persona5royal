import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

const types = [
  { id: 1, text: 'Quiz' },
  { id: 2, text: 'Final' },
]

export default function ComboboxExamDate() {
  const [selected, setSelected] = useState([{ id: 0, text: 'Choose an option' }, ...types])
  const [query, setQuery] = useState('')

  const filtered =
    query === ''
      ? types
      : types.filter(type => type.text.toLowerCase().trim().includes(query.toLowerCase().trim()))

  return (
    <div>
      <Combobox
        value={selected[0]}
        onChange={setSelected}>
        <div className='relative mt-1 w-80'>
          <div className='relative w-full cursor-default overflow-hidden rounded-lg bg-transparent text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
            <Combobox.Input
              className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 focus:ring-0 bg-gray-600'
              displayValue={type => type.text}
              onFocus={() => setQuery('')}
              onChange={event => setQuery(event.target.value)}
            />
            <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronDownIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}>
            <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-base-300 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {filtered.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none py-2 px-4'>Nothing found.</div>
              ) : (
                filtered.map(type => (
                  <Combobox.Option
                    key={type.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-gray-600' : ''
                      }`
                    }
                    value={type}>
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {type.text}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'bg-gray-600' : ''
                            }`}></span>
                        ) : (
                          ''
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
