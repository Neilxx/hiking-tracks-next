import Head from 'next/head'
import Navbar from './navbar.js'

const layout = ({ id, children, trackInfo: { summary: { title = 'Hiking Tracks', content = '' } = {} } = {} }) => (
  <div id="root">
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta name="description" content={content} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={content}/>
      <meta property="og:image" content={`https://hiking.dajing.li/images/${id}/og_image.jpg`} />

      <link rel="shortcut icon" href="/favicon.png" />
      {/* google font */}
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Open+Sans&display=swap" rel="stylesheet" />
      {/* bootstrap CDN */}
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"/>
      <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    </Head>
    <header>
      <Navbar/>
    </header>
    { children }
  </div>
)

export default layout;
