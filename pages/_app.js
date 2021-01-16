import '../styles/globals.css'
import '../styles/App.css'
import 'leaflet/dist/leaflet.css'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
  return  <Layout title={pageProps.title}>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
