import Head from 'next/head.js'
import React, { useEffect, useState } from 'react'

import { ConfidantCard } from '../../components/Confidant/ConfidantCard.jsx'
import Layout from '../../components/layout/confidantsLayout.jsx'
import { getConfidantList } from '../../controller/confidantController.js'

export const getStaticProps = async () => {
  const confidants = await getConfidantList()
  return {
    props: {
      confidants,
    },
  }
}

export default function Confidants({ confidants }) {
  const [searchValue, setSearchValue] = useState('')
  const [filterResult, setResults] = useState([...confidants])

  useEffect(() => {
    if (searchValue === '') return setResults([...confidants])
    let result = confidants.filter(obj => {
      const checkArcana = obj.arcana.toLowerCase().includes(searchValue.toLowerCase()),
        checkName = obj.name.toLowerCase().includes(searchValue.toLowerCase()),
        checkFamilyName = obj.familyName.toLowerCase().includes(searchValue.toLowerCase())
      if (checkArcana || checkName || checkFamilyName) return obj
    })
    if (result.length === 0) return setResults([...confidants])
    return setResults(result)
  }, [confidants, searchValue])

  return (
    <div>
      <Head>
        <title>Confidant guide | Persona 5 royal</title>
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <main>
        <section className='container w-full mx-auto'>
          <div className='flex flex-1 justify-center pb-10'>
            <input
              type='text'
              placeholder='Example: Chariot, Ryuji...'
              className='input input-bordered w-full max-w-xs'
              autoComplete='off'
              value={searchValue}
              onInput={e => setSearchValue(e.target.value.trim())}
            />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 md:gap-5 auto-cols-max justify-items-center items-center'>
            <ConfidantCard confidants={filterResult} />
          </div>
        </section>
      </main>
    </div>
  )
}

Confidants.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
