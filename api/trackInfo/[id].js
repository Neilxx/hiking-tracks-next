// const tracks = require(`../tracks/${id}/tracks.js`);

export default async (req, res) => {
  const {
    query: { id },
  } = req
  // const {tracks} = await import(`../tracks/${id}/tracks.js`);

  // const tracks = require(`../tracks/${id}/tracks.js`);
  const trackInfo = await getTrackInfo(id);
  res.statusCode = 200
  res.json(trackInfo)
}

export const getTrackInfo = async (id) => {
  const tracks = await import(`../../public/tracks/${id}/tracks.js`);
  const { trackPoints } = await import(`../../public/tracks/${id}/trackPoints.js`);
  const overviews = [
    [
      '停車場 → 石夢谷 → 仙夢園 → 叉路取右→ 石夢谷 → 塔山車站 → 三號隧道旁紮營 C1',
      'C1 → 眠月車站 → 石猴車站 → 松山 → 酒瓶營地 → 眠月神木叉路 → 水漾森林',
      'C2 → 水漾森林 → 千人洞 → 臥船洞 → 行豐吊橋 → 停車場'
    ],
    [
      '停車場 → 石夢谷 → 仙夢園 → 叉路取右→ 石夢谷 → 塔山車站 → 三號隧道旁紮營 C1',
      'C1 → 眠月車站 → 石猴車站 → 松山 → 酒瓶營地 → 眠月神木叉路 → 水漾森林',
      'C2 → 水漾森林 → 千人洞 → 臥船洞 → 行豐吊橋 → 停車場'
    ],
  ];

  const summarys = [
    {
      title: '石夢眠月水漾',
      content: `        時間：2020.02.28 - 2020.03.01
        人員：大軍、彥廷、阿如、冠魚、小乖、阿伊、爾森、Winky`,
    },
    {
      title: '石夢眠月水漾',
      content: `        時間：2020.02.28 - 2020.03.01
        人員：大軍、猴猴麵包樹、阿周、浪人彥廷、阿如、爾森、Winky`,
    }
  ]

  const trackInfo = {
    // tracks: tracks,
    trackPoints: trackPoints,
    overviews: overviews[id - 1],
    summary: summarys[id - 1]
  }
  return trackInfo;
};
