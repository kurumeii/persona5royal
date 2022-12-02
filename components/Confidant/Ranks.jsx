import React, { forwardRef } from 'react'
import TableData from './TableData.jsx'

function Ranks(props, ref) {
  const { level, responses, unlock_new_ability, statRequired } = props
  const bindingRef = elementRef => {
    if (unlock_new_ability) ref.current.push(elementRef)
  }
  return (
    <div className='overflow-x-auto'>
      <div
        className='py-10'
        ref={eleRef => bindingRef(eleRef)}
      >
        <p className='font-bold text-3xl text-center pb-5'>
          Rank {level}
          <br />
          {statRequired ? <span className='text-gray-500'>{statRequired} is required</span> : ''}
        </p>

        <table className='table w-full select-none'>
          <tbody>
            {responses.map(response => (
              <TableData
                key={level + '_' + response.id}
                level={response.id}
                options={response?.options}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default forwardRef(Ranks)
