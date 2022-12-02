import React from 'react'

export default function TableData(props) {
  const { level, options } = props

  const text = index => {
    if (!options[index]) return ''
    return options[index].text
  }

  const point = index => {
    if (!options[index]) return ''
    return options[index]?.same ? (
      <span className='text-red-500'> +{options[index].point + 1}</span>
    ) : (
      ` +${options[index].point}`
    )
  }

  return (
    <tr>
      <td className='py-10 font-bold'>Response {level}</td>
      <td className='py-10 italic'>
        {text(0)} {point(0)}
      </td>
      <td className='py-10 italic'>
        {text(1)} {point(1)}
      </td>
      <td className='py-10 italic'>
        {text(2)} {point(2)}
      </td>
    </tr>
  )
}
