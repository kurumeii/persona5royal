import { Combobox, Transition } from '@headlessui/react'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router.js'
import { Fragment, useEffect, useState } from 'react'

export default function SearchConfidant() {
  const [selectedPerson, setSelectedPerson] = useState([])
  const [query, setQuery] = useState('')
  const router = useRouter()
  const activeCls = active => (active ? 'text-primary bg-base-200' : 'text-base')

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    const fetchData = async () => {
      try {
        if (query === '') return setSelectedPerson([])
        const fetching = await fetch('/api/confidants', {
          method: 'POST',
          body: JSON.stringify({
            searchQuery: query,
          }),
          signal,
        })

        const { result, error } = await fetching.json()
        if (error) return console.error(error)
        setSelectedPerson(result)
      } catch (error) {
        if (error.name === 'AbortError') return
      }
    }
    fetchData()
    return () => {
      controller.abort()
    }
  }, [query])

  const handelChooseOption = chosenOption => router.replace('/confidants/' + chosenOption.arcana)

  return (
    <Combobox
      value={selectedPerson}
      onChange={handelChooseOption}
    >
      <div className='relative w-full max-w-xl mt-1'>
        <div className='relative overflow-hidden rounded-lg text-left'>
          <Combobox.Input
            className='input input-bordered w-full'
            placeholder='Quick navigate to confidant'
            autoComplete='off'
            displayValue={person => person?.name}
            onChange={event => setQuery(event.target.value.trim())}
          />
          <span className='absolute inset-y-0 right-0 flex items-center pr-2'>
            <PaperAirplaneIcon
              className='h-5 w-5 -rotate-45'
              title='Go to'
            />
          </span>
        </div>
        <Transition
          as={Fragment}
          enter='transition duration-100 ease-out'
          enterFrom='transform scale-95 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leave='transition duration-75 ease-out'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-95 opacity-0'
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className='absolute mt-1 w-full max-h-72 overflow-auto rounded-md bg-base-100 cursor-pointer'>
            {(selectedPerson.length === 0) & (query !== '') ? (
              <div className='relative select-none py-2 px-4'>Nothing found</div>
            ) : (
              selectedPerson.map(person => (
                <Combobox.Option
                  key={person.id}
                  value={person}
                  className={({ active }) => `relative select-none py-2 px-4 ${activeCls(active)}`}
                >
                  <span className={`block truncate font-normal`}>
                    {person.familyName} {person.name}
                  </span>
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}
