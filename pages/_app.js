import '../styles/globals.css'
import '../styles/App.css'
import 'leaflet/dist/leaflet.css'
import Router from "next/router"
import Layout from '../components/layout'
import Loading from "../components/loading";
import { initGA, logPageView } from '../utils/analytics'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

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

  const router = useRouter();

  useEffect(() => {
    initGA()
    // `routeChangeComplete` won't run for the first page load unless the query string is
    // hydrated later on, so here we log a page view if this is the first render and
    // there's no query string
    if (!router.asPath.includes('?')) {
      logPageView()
    }
  }, [])

  useEffect(() => {
    // Listen for page changes after a navigation or when the query changes
    router.events.on('routeChangeComplete', logPageView)
    return () => {
      router.events.off('routeChangeComplete', logPageView)
    }
  }, [router.events])

  return  <Layout {...pageProps}>
    <Loading/>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
