import Image from 'next/image.js'
import Link from 'next/link.js'
import React, { createRef, forwardRef, useEffect } from 'react'

function Months(props, ref) {
  const { data, scrollToContent } = props
  return (
    <>
      <div className='col-span-2'>
        <div className='w-60 sticky top-0 max-h-screen overflow-auto overscroll-contain'>
          <ul className='menu menu-vertical bg-base-300 '>
            {data.map((obj, i) => (
              <li
                key={i}
                className='hover-bordered'
              >
                <Link
                  href=''
                  onClick={e => scrollToContent(e, i)}
                >
                  {obj.monthName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='col-span-10'>
        {data.map((obj, index) => (
          <div
            className='card lg:card-side py-10'
            key={index}
            ref={ref[index]}
          >
            <div className='card-body'>
              <table className='table mx-auto w-96'>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {obj?.dates?.map(date => (
                    <tr key={date?.day}>
                      <td className='font-bold'>{`${obj?.monthInNumber}/${date?.day}`}</td>
                      <td>
                        <ul>
                          {date?.answers?.map(ans => (
                            <li key={ans?.id}>{ans?.choice + ': ' + ans?.text}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <figure>
              {obj ? (
                <Image
                  src={`/final/${obj?.monthName?.toLowerCase()}.jpg`}
                  alt='cover picture'
                  width={600}
                  height={300}
                />
              ) : null}
            </figure>
          </div>
        ))}
      </div>
    </>
  )
}

export default forwardRef(Months)
