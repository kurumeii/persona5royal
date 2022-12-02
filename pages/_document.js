import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html data-theme='dracula'>
      <Head />
      <body className='antialiased'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
