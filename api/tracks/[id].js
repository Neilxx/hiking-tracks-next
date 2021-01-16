export default async (req, res) => {
  const {
    query: { id },
  } = req
  debugger;
  const trackInfo = await getTracks(id);
  res.statusCode = 200
  res.json(trackInfo)
}

export const getTracks = async (id) => {
  const {tracks} = await import(`../tracks/${id}/tracks.js`);
  return tracks;
};
