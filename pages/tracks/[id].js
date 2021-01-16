// import GeoMap from '../../components/GeoMap'
import dynamic from "next/dynamic";
import { getTrackInfo } from "../../api/trackInfo/[id].js";
import { getTracks } from "../../api/tracks/[id].js";
import React, { Component, useState } from 'react'
import Navbar from "../../components/navbar"
const GeoMap = dynamic(
  () => import("../../components/GeoMap"),
  { ssr: false },
);

// posts will be populated at build time by getStaticProps()
const TrackInfo = ({ trackInfo, tracks, id }) => {
  return <>
    <GeoMap {...{
      trackInfo,
      tracks,
      id,
    }}/>
  </>
}

// class TrackInfoMap extends Component {
//   state = {
//     inBrowser: false,
//   }
//   componentDidMount() {
//     this.setState({ inBrowser: true });
//   }
//   render() {
//     return <>{this.state.inBrowser ? <GeoMap/> : null}</>
//   }
// }
export default TrackInfo;

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps(context) {
  const { params: { id }, req } = context;
  const tracks = await getTracks(id);
  const trackInfo = await getTrackInfo(id);
  return {
    props: { tracks: JSON.parse(JSON.stringify(tracks)), trackInfo, id },
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
    ],
    fallback: false,
  };
}
