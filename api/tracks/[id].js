export default async (req, res) => {
  const {
    query: { id },
  } = req
  const trackInfo = await getTracks(id);
  res.statusCode = 200
  res.json(trackInfo)
}

export const getTracks = async (id) => {
  const {tracks} = await import(`../../public/tracks/${id}/tracks.js`);
  return tracks;
};
