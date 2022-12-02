import { QueueListIcon } from '@heroicons/react/24/outline'
import Head from 'next/head.js'
import Image from 'next/image.js'
import Link from 'next/link.js'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import Ranks from '../../components/Confidant/Ranks.jsx'
import ScrollToTop from '../../components/ScrollToTop.jsx'
import {
  getConfidantAbilities,
  getConfidantInfo,
  getConfidantList,
  getConfidantReponses,
} from '../../controller/confidantController.js'

export const getStaticPaths = async () => {
  const confidants = await getConfidantList()
  return {
    paths: confidants.map(confidant => {
      return {
        params: {
          arcanaId: confidant.arcana,
        },
      }
    }),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const [arcanaAbilities, arcanaResponses, arcanaInfo] = await Promise.all([
    getConfidantAbilities(params.arcanaId),
    getConfidantReponses(params.arcanaId),
    getConfidantInfo(params.arcanaId),
  ])
  return {
    props: {
      arcanaAbilities,
      arcanaResponses,
      arcanaInfo,
    },
  }
}

export default function ConfidantInfo(props) {
  const { arcanaAbilities, arcanaResponses, arcanaInfo } = props
  const router = useRouter()
  const { arcanaId } = router.query
  const title = `${arcanaId} | Persona 5 royal`
  const { benefits, romanceable } = arcanaAbilities
  const { fullname } = arcanaInfo
  const rankRef = useRef([])
  const scrollToRank = (index, rank) => {
    if (rank === 'ROYAL') return null
    rankRef.current[index].scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <main>
        <div className='card w-full bg-base-300 shadow-md'>
          <div className='flex-none px-2 m-10'>
            <Link
              href='/confidants'
              replace
            >
              <button className='btn btn-ghost gap-2'>
                <QueueListIcon className='h-6 w-6 ' />
                Back to list
              </button>
            </Link>
          </div>
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
            </div>
            <div className='px-36'>
              {romanceable && (
                <div className='text-center font-bold text-secondary'>
                  If you have {fullname} last gameplay christmas gift, it&rsquo;ll automatically
                  gives maximum point for correct choices
                </div>
              )}

              {arcanaResponses.map(({ level, responses, unlock_new_ability, statRequired }) => (
                <Ranks
                  key={level}
                  level={level}
                  unlock_new_ability={unlock_new_ability}
                  statRequired={statRequired}
                  responses={responses}
                  ref={rankRef}
                />
              ))}
            </div>
          </div>
        </div>
        <ScrollToTop></ScrollToTop>
      </main>
    </>
  )
}
