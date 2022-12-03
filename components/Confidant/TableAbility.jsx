import React from 'react'

function TableAbility(props) {
  const { benefits, scrollToRank } = props

  return (
    <table className='table w-fit select-none cursor-pointer'>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Ability</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {benefits.map((obj, i) => (
          <tr
            key={obj.rank}
            className='hover'
            onClick={() => scrollToRank(i, obj.rank)}
          >
            <td className='font-bold'>{obj.rank}</td>
            <td>{obj.ability}</td>
            <td>{obj.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableAbility
