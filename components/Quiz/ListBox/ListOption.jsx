import { Listbox } from '@headlessui/react'
import { CursorArrowRaysIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { types } from '../../../pages/quiz_n_exam.js'

const ListOption = () =>
  types.map((type, index) => {
    const optClass = ({ active }) =>
      classNames('relative cursor-pointer select-none py-2 pl-10 pr-4', active ? 'bg-gray-500' : '')

    const optText = ({ selected }) => (
      <>
        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
          {type.text}
        </span>
        {selected ? (
          <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
            <CursorArrowRaysIcon
              className='h-5 w-5'
              aria-hidden='true'
            />
          </span>
        ) : null}
      </>
    )

    return (
      <Listbox.Option
        key={index}
        className={optClass}
        value={type}
      >
        {optText}
      </Listbox.Option>
    )
  })

export default ListOption
