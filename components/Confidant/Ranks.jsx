import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import TableData from './TableData.jsx'

function Ranks(props, ref) {
  const { arcanaResponses } = props

  return (
    <>
      {arcanaResponses.map(({ level, responses, statRequired }, i) => (
        <div
          className='overflow-x-auto'
          key={level}
        >
          <div
            className='py-10'
            ref={el => (ref.current[i] = el)}
            id={level}
          >
            <p className='font-bold text-3xl text-center pb-5'>
              Rank {level}
              <br />
              {statRequired ? (
                <span className='text-gray-500'>{statRequired} is required</span>
              ) : (
                ''
              )}
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
      ))}
    </>
  )
}
export default forwardRef(Ranks)
