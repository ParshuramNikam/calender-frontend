import React from 'react'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import '../global-styles.css'


export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
