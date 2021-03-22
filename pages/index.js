import Head from 'next/head'
import Link from 'next/link'
import Carousel from 'react-bootstrap/Carousel'

export default function Home({ isConnected }) {
  return (
    <>
      <Head>
        <title>Hiking Tracks</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <Carousel>
          <Carousel.Item>
            <img
              src="home_page.png"
              alt="home_page"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="60322b18b69d64f0ce86c6a5.jpg"
              alt="60322b18b69d64f0ce86c6a5"
            />
            <Link href='/tracks/60322b18b69d64f0ce86c6a5' passHref>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div {...{
                  style: {
                    backgroundColor: 'rgba(51,51,51,.5)',
                    position: 'absolute',
                    top: '30%',
                    color: 'white',
                    // marginTop: 200,
                    fontSize: 60,
                    padding: '40px 0',
                  }
                }}>
                  <p style={{writingMode: 'vertical-lr', textOrientation: 'upright', cursor: 'pointer', margin: 20}}>石夢•眠月•水漾</p>
                </div>
              </div>
            </Link>
          </Carousel.Item>
          {/* <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Second slide&bg=282c34"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Third slide&bg=20232a"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item> */}
        </Carousel>
      </main>
    </>
  )
}
