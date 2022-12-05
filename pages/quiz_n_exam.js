import Head from 'next/head.js'
import React, { useState } from 'react'
import Layout from '../components/layout/confidantsLayout.jsx'
import ListboxType from '../components/Quiz/ListBox/ListboxType.jsx'
import ListContent from '../components/Quiz/ListBox/ListContent.jsx'
import ScrollToTop from '../components/shared/ScrollToTop.jsx'

export const types = [
  { id: 1, text: 'Final' },
  { id: 2, text: 'Quiz' },
]

export default function Quiz_and_exam() {
  const [selected, setSelected] = useState(types[0])
  return (
    <div>
      <Head>
        <title>Quiz and exam guide | Persona 5 royal</title>
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <main>
        <section className='container w-full mx-auto'>
          <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-full sm:col-start-1 sm:col-end-6 lg:col-start-1 lg:col-end-3'>
              <ListboxType
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            <div className='col-span-full flex flex-1 justify-center'>
              {selected.length !== 0 ? <ListContent selected={selected} /> : null}
            </div>
          </div>
        </section>
        <ScrollToTop />
      </main>
    </div>
  )
}
Quiz_and_exam.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
