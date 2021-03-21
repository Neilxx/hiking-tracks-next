
// import moment from 'moment';
import Point from '../../models/Point';
import Photo from '../../models/Photo';
import dbConnect from '../../utils/dbConnect';

import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

export default async (req, res) => {
  const {
    query: { id },
  } = req

  const trackInfo = await getTrackInfo(id);
  res.statusCode = 200
  res.json(trackInfo)
}

export const getTrackInfo = async (id) => {
  dayjs().utcOffset(8);
  const tracks = await import(`../../public/tracks/${id}/tracks.js`);
  await dbConnect();
  const points = await Point.find({ _trackId: id }).populate('photos').lean();
  points.forEach(point => point.timeStr = dayjs.utc(point.time).utcOffset(8).format('YYYYMMDD_HHmmss'));

  const overviews = {
    '20200228': '停車場 → 石夢谷 → 仙夢園 → 叉路取右→ 石夢谷 → 塔山車站 → 三號隧道旁紮營 C1',
    '20200229': 'C1 → 眠月車站 → 石猴車站 → 松山 → 酒瓶營地 → 眠月神木叉路 → 水漾森林',
    '20200301': 'C2 → 水漾森林 → 千人洞 → 臥船洞 → 行豐吊橋 → 停車場'
  };

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
    // work around. source: https://github.com/vercel/next.js/issues/11993
    tracks: JSON.parse(JSON.stringify(tracks)),
    points: JSON.parse(JSON.stringify(points)), //_id is not plain object
    overviews,
    summary: summarys[0],
  }
  return trackInfo;
};
