import Image from 'next/image.js'
import Link from 'next/link.js'
import React, { createRef, useEffect, useRef, useState } from 'react'
import CrossWord from '../Quiz/Crossword.jsx'
import Months from '../Quiz/Months.jsx'

function ListContent({ selected }) {
  const [data, setData] = useState([])
  const [elRefs, setElRefs] = useState([])

  const type = selected.text.toLowerCase()
  const scrollToContent = (e, i) => {
    e.preventDefault()
    elRefs[i].current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    const fetchData = async () => {
      try {
        const fetching = await fetch('/api/quiz_n_exam', {
          method: 'POST',
          body: JSON.stringify({ type }),
          signal,
        })

        const { result } = await fetching.json()
        setData(result)
      } catch (error) {
        if (error.name === 'AbortError') return
      }
    }
    fetchData()
    return () => {
      controller.abort()
    }
  }, [type])

  useEffect(() => {
    // add or remove refs
    setElRefs(elRefs =>
      Array(data.length)
        .fill()
        .map((_, i) => elRefs[i] || createRef())
    )
  }, [data.length])

  return (
    <div className='card w-full bg-base-200'>
      <figure>
        <Image
          src={`/${type}/${type}_bg.jpg`}
          alt={`${type}_bg.jpg`}
          width={1024}
          height={800}
          priority
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title justify-center font-bold text-5xl pb-10'>{type} guide</h2>
        <section className='grid grid-cols-12 justify-center pt-10'>
          {type === 'final' ? (
            <Months
              scrollToContent={scrollToContent}
              data={data}
              ref={elRefs}
            />
          ) : (
            <CrossWord
              scrollToContent={scrollToContent}
              data={data}
              ref={elRefs}
            />
          )}
        </section>
      </div>
    </div>
  )
}

export default ListContent
