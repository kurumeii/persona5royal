import SharedHeader from '../shared/sharedHeader.jsx'

export default function Layout(props) {
  const { children } = props

  return (
    <div>
      <SharedHeader />
      <main>{children}</main>
    </div>
  )
}
