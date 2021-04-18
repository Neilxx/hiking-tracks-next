import '../styles/globals.css'
import '../styles/App.css'
import 'leaflet/dist/leaflet.css'
import Router from "next/router"
import Layout from '../components/layout'
import Loading from "../components/loading";

Router.onRouteChangeStart = () => {
  document.getElementById('loading').style.display = 'flex';
}
Router.onRouteChangeComplete = () => {
  document.getElementById('loading').style.display = 'none';
}
Router.onRouteChangeError = () => {
  document.getElementById('loading').style.display = 'none';
}

function MyApp({ Component, pageProps }) {
  return  <Layout {...pageProps}>
    <Loading/>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
