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
                    fontSize: 60,
                    padding: '40px 0',
                  }
                }}>
                  <p style={{writingMode: 'vertical-lr', textOrientation: 'upright', cursor: 'pointer', margin: 20}}>石夢•眠月•水漾</p>
                </div>
              </div>
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="6050a26e8a62c1cc17100fd2.jpeg"
              alt="6050a26e8a62c1cc17100fd2"
            />
            <Link href='/tracks/6050a26e8a62c1cc17100fd2' passHref>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div {...{
                  style: {
                    position: 'absolute',
                    top: '40%',
                    fontSize: 60,
                  }
                }}>
                  <p style={{cursor: 'pointer', border: 'solid 5px black', padding: '5px 20px'}}>無雙 • 童話 • 嘆息</p>
                </div>
              </div>
            </Link>
          </Carousel.Item>
        </Carousel>
      </main>
    </>
  )
}
