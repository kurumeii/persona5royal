import Head from 'next/head.js'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import CardInfoContent from '../../components/Confidant/ConfidantContainer/CardInfoContent.jsx'
import NavigateButton from '../../components/Confidant/ConfidantContainer/NavigateButton.jsx'
import TopButtonGroup from '../../components/Confidant/ConfidantContainer/TopButtonGroup.jsx'
import ScrollToTop from '../../components/shared/ScrollToTop.jsx'
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
  const [arcanaAbilities, arcanaResponses, arcanaInfo, confidantList] = await Promise.all([
    getConfidantAbilities(params.arcanaId),
    getConfidantReponses(params.arcanaId),
    getConfidantInfo(params.arcanaId),
    getConfidantList(),
  ])
  const ids = confidantList.map(c => c.id)
  const arcanas = confidantList.map(c => c.arcana)
  return {
    props: {
      arcanaAbilities,
      arcanaResponses,
      arcanaInfo,
      pageInfo: {
        hasNextPage:
          ids.indexOf(arcanaInfo.id) >= 0 && ids.indexOf(arcanaInfo.id) !== ids.length - 1,
        hasPrevPage: ids.indexOf(arcanaInfo.id) > 0 && ids.indexOf(arcanaInfo.id) <= ids.length - 1,
        nextArcana: arcanas[+arcanaInfo.id + 1 - 1] || '',
        prevArcana: arcanas[+arcanaInfo.id - 1 - 1] || '',
      },
    },
  }
}

const KEYS = {
  'ESCAPE_KEY': 27,
}

export default function ConfidantInfo(props) {
  const router = useRouter()
  const { arcanaAbilities, arcanaResponses, arcanaInfo, pageInfo } = props
  const { romanceable, benefits } = arcanaAbilities
  const { fullname, arcana } = arcanaInfo
  const title = `${arcana} confidant guide | Persona 5 royal`

  const handleKeyDown = useCallback(
    event => {
      switch (event.keyCode) {
        case KEYS.ESCAPE_KEY:
          router.replace('/confidants')
          break
        default:
          break
      }
    },
    [router]
  )

  useEffect(() => {
    const isSupported = window && window.addEventListener
    if (!isSupported) return
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <>
      <Head>
        <title>{title}</title>
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <>
        <div className='card w-full bg-base-300 shadow-md'>
          <TopButtonGroup />
          <CardInfoContent
            arcanaId={arcana}
            benefits={benefits}
            romanceable={romanceable}
            fullname={fullname}
            arcanaResponses={arcanaResponses}
          />
          <NavigateButton pageInfo={pageInfo} />
          <ScrollToTop />
        </div>
      </>
    </>
  )
}
