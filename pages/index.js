import Head from 'next/head'
import Link from 'next/link'
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import { isMobile } from "react-device-detect";

export default function Home({ isConnected }) {
  return <>
    {
      isMobile
        ? <MobileHome/>
        : <WebHome/>
    }
  </>
}

const WebHome = () => (
  <>
    <main>
      <Carousel>
        <Carousel.Item>
          <img
            src="home_page.jpg"
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
            src="6050a26e8a62c1cc17100fd2.jpg"
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

const MobileHome = () => (
  <div id='mobile-home'>
    {/* <div>
      <div className='title'>
        2020.02.28 石夢•眠月•水漾
      </div>
      <img
        src="60322b18b69d64f0ce86c6a5_mobile.jpg"
        alt="60322b18b69d64f0ce86c6a5_mobile"
      />
    </div>
    <div>
      <div className='title'>
        2020.06.21 無雙 • 童話 • 嘆息
      </div>
      <img
        src="6050a26e8a62c1cc17100fd2_mobile.jpg"
        alt="6050a26e8a62c1cc17100fd2_mobile"
      />
    </div> */}
    <Link href='/tracks/607aa95447d537147a4a1d0a' passHref>
      <div>
        <img
          src="607aa95447d537147a4a1d0a_mobile.jpg"
          alt="607aa95447d537147a4a1d0a_mobile"
        />
        <div className='title'>
          哈卡巴里斯
        </div>
        <div className='date'>
          2021.04.02-05
          <span>4天</span>
        </div>
      </div>
    </Link>
    <Link href='/tracks/6050a26e8a62c1cc17100fd2' passHref>
      <div>
        <img
          src="6050a26e8a62c1cc17100fd2_mobile.jpg"
          alt="6050a26e8a62c1cc17100fd2_mobile"
        />
        <div className='title'>
          無雙 • 童話 • 嘆息
        </div>
        <div className='date'>
          2020.06.21-28
          <span>8天</span>
        </div>
      </div>
    </Link>
    <Link href='/tracks/60322b18b69d64f0ce86c6a5' passHref>
      <div>
        <img
          src="60322b18b69d64f0ce86c6a5_mobile.jpg"
          alt="60322b18b69d64f0ce86c6a5_mobile"
        />
        <div className='title'>
          石夢 • 眠月 • 水漾
        </div>
        <div className='date'>
          2020.02.28-03.01
          <span>3天</span>
        </div>
      </div>
    </Link>
  </div>
)
