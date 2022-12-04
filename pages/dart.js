import Head from 'next/head.js'
import Image from 'next/image.js'
import React from 'react'
import Layout from '../components/layout/confidantsLayout.jsx'
import dartCardCover from '/public/dart/Darts_card_cover.jpg'

const people = [
  { name: 'Ann', choice: 'Just play like normal.' },
  { name: 'Morgana', choice: ' I’m counting on you.' },
  { name: 'Yusuke', choice: 'Pretend like you’re painting.' },
  { name: 'Ryuji', choice: 'You gotta psych yourself up!' },
  { name: 'Makoto', choice: 'Take a deep breath.' },
  { name: 'Futaba', choice: 'This is real.' },
  { name: 'Haru', choice: 'Have fun with it.' },
  { name: 'Sumire', choice: 'Trust your instincts.' },
]

export default function Dart() {
  return (
    <div>
      <Head>
        <title>Dart guide | Persona 5 royal</title>
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>

      <section className='container w-full mx-auto flex flex-1 justify-center'>
        <div className='card w-1/2 bg-base-300'>
          <figure className='px-10 pt-10'>
            <Image
              src={dartCardCover}
              alt='dart_card_cover'
              priority
            />
          </figure>
          <div className='card-body'>
            <div className='card-title justify-center text-4xl uppercase'>
              Persona 5 Royal darts answers
            </div>
            <div className='pt-10 text-lg'>
              <p>
                On turn four, each of the main Phantom Thieves will ask for encouragement.
                Responding with the correct answer will ensure that they win the game (as long as
                the score allows them to), and you’ll rank up their Baton Pass twice. The correct
                answers are as follows:
              </p>
              <ul className=' mt-3 ml-3'>
                {people.map(person => (
                  <li
                    key={person.name}
                    className='truncate'
                  >
                    <span className='text-primary font-bold'>{person.name}</span>:{' '}
                    {person.choice.trim()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

Dart.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
