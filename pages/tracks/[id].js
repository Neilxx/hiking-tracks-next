import dynamic from "next/dynamic";
import { getTrackInfo } from "../../api/trackInfo/[id].js";
import { getTracks } from "../../api/tracks/[id].js";
import React from 'react';
const GeoMap = dynamic(
  () => import("../../components/geoMap"),
  { ssr: false },
);

const TrackInfo = ({ tracks, trackInfo, id }) => {
  return <>
    <GeoMap {...{
      key: id,
      tracks,
      trackInfo,
      id,
    }}/>
  </>
}

export default TrackInfo;

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps(context) {
  const { params: { id }, req } = context;
  const tracks = await getTracks(id);
  const trackInfo = await getTrackInfo(id);

  return {
    props: { tracks, trackInfo, id },
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '60322b18b69d64f0ce86c6a5' } },
      { params: { id: '6050a26e8a62c1cc17100fd2' } },
    ],
    fallback: false,
  };
}
