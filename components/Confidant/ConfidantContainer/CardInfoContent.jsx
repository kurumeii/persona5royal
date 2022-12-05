import Image from 'next/image.js'
import React, { useRef } from 'react'
import Ranks from './CardInfoBody/Ranks.jsx'
import TableAbility from './CardInfoBody/TableAbility.jsx'

function CardInfoContent(props) {
  const { arcanaId, fullname, benefits, romanceable, arcanaResponses } = props
  const rankRef = useRef([])
  const scrollToRank = rank => {
    if (rank === 'ROYAL') return null
    const index = rankRef.current.find(el => +el.id === rank)
    rankRef.current[rankRef.current.indexOf(index)].scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <figure className='pt-10'>
        <Image
          src={`/confidants/${arcanaId}/${arcanaId}_with_joker.jpg`}
          alt={arcanaId}
          width={600}
          height={300}
          style={{
            width: 'auto',
            height: 'auto',
          }}
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title text-center justify-center text-5xl'>
          Persona 5 Royal Confidant Guide:
          <br />
          {arcanaId} ({fullname})
        </h2>
        <div
          className='overflow-x-auto flex flex-1 flex-col justify-center items-center pt-10'
          id='benefit'
        >
          <TableAbility
            benefits={benefits}
            onClickHandler={scrollToRank}
          />
        </div>
        <div className='px-36'>
          {romanceable && (
            <div className='text-center font-bold text-secondary'>
              If you have {fullname} last gameplay christmas gift, it&rsquo;ll automatically gives
              maximum point for correct choices
            </div>
          )}
          <Ranks
            arcanaResponses={arcanaResponses}
            ref={rankRef}
          />
        </div>
      </div>
    </>
  )
}

export default CardInfoContent
