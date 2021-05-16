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
    '60322b18b69d64f0ce86c6a5': {
      '20200228': '停車場 → 石夢谷 → 仙夢園 → 叉路取右→ 石夢谷 → 塔山車站 → 三號隧道旁紮營 C1',
      '20200229': 'C1 → 眠月車站 → 石猴車站 → 松山 → 酒瓶營地 → 眠月神木叉路 → 水漾森林',
      '20200301': 'C2 → 水漾森林 → 千人洞 → 臥船洞 → 行豐吊橋 → 停車場'
    },
    '6050a26e8a62c1cc17100fd2': {
      '20200621': '32K郡大山登山口 → 無雙山登山口/郡大林道45.3K → 烏瓦拉鼻溪營地 → 無雙社 C1',
      '20200622': 'C1 → 亞力士營地 → 最後水源 W2 → 無雙山 → 無雙東峰鐵杉林營地 C2',
      '20200623': 'C2 → 儲山 → 水源叉路 → 本鄉山 → 東郡大山 → 獵人營地 C3',
      '20200624': 'C3 → 郡東山 →可樂可樂安山 → 天南可蘭山 → 童話世界 C4',
      '20200625': 'C4 = C5 休息天',
      '20200626': 'C5 童話世界 → 裡門山 → 斷稜東山 → 義西請馬至山 → 烏妹浪胖山 → 哈伊拉漏溪北源營地 → 僕洛西擴山 → 嘆息灣 C6',
      '20200627': 'C6 嘆息灣 → 馬利加南山北峰 → 馬利加南山 → 馬利亞文路山東峰 → 馬利亞文路山 → 馬博山屋 C7',
      '20200628': 'C7 馬博山屋 → 秀姑巒山 → 秀姑坪 → 白洋金礦山屋 → 中央金礦山屋 → 八通關 → 東埔',
    },
    '607aa95447d537147a4a1d0a': {
      '20210402': 'C0 南澳古道登山口 → 林務局工寮 → 舊武塔國小(單攻) → 林務局工寮 → 富太山叉路 → 富太山(單攻) → 1395峰 → 接古道 C1',
      '20210403': 'C1 → 俚與邊山 → 西南寬稜轉西北處，下西南稜 → 布蕭丸溪底 C2',
      '20210404': 'C2 → 哈卡巴里斯 → 銘山 → 最低鞍附近 C3',
      '20210405': 'C3 → 接林道 → 翠峰湖',
    }
  };

  const summarys = {
    '60322b18b69d64f0ce86c6a5': {
      title: '石夢 • 眠月 • 水漾 (三天)',
      day: 3,
      date: '2020.02.28 - 2020.03.01',
      members: '大軍、彥廷、阿如、冠魚、小乖、阿伊、爾森、Winky',
      memberNumber: 8,
    },
    '6050a26e8a62c1cc17100fd2': {
      title: '無雙 • 童話 • 嘆息',
      day: 8,
      date: '2020.06.21 - 2020.06.28',
      members: '詣淳(領隊 OB)、大軍(實領 OB)、彥廷(實領 OB)、曹妹(外校)、iio(嚮導 OB)、鮪魚(嚮導 OB)、天赫(實領)',
      memberNumber: 7,
    },
    '607aa95447d537147a4a1d0a': {
      title: '哈卡巴里斯',
      day: 4,
      date: '2021.04.02 - 2021.04.05',
      members: '大軍(領隊 OB、紀錄)、彥廷(實領 OB)、曹妹(外校)、幾摳(嚮導 OB)、文家(嚮導 OB)、詣淳(嚮導 OB)、天赫(實領)',
      memberNumber: 7,
      gpxFileName: '20210402_哈卡巴里斯_航跡.gpx',
      others: [
        '左右方向以本隊行進方向為主',
      ],
      references: [
        { name: '2011.1 莎韻之路探哈卡巴里斯出銘山 (台大)', url: 'http://www.mountain.org.tw/WebBBS/Record/RecordOne.aspx?RecordID=217&MessageID=20502' },
        { name: '2016.4 莎韻之路 (馬克)', url: 'https://www.markchoo.com.tw/mark/2834' },
        { name: '2011.10 南澳環形古道_莎韻之路 (週三隊)', url: 'https://www.keepon.com.tw/thread-18e87e16-17d8-e411-93ec-000e04b74954.html' },
        { name: '2016.4 南澳古道莫很溫泉出太平山 (參考銘山段)', url: 'http://ys1128.blogspot.com/2016/04/201604010407.html' },
        { name: '流興山 (俚與邊) -> 哈卡巴里斯 路徑探討', url: 'https://www.keepon.com.tw/thread-5b5e4451-16d8-e411-93ec-000e04b74954.html' },
        { name: 'HAGA PARIS 哈卡巴里斯紀錄片', url: 'https://www.youtube.com/watch?app=desktop&v=HMzXV_icDvw' },
        { name: '找路：月光．沙韻．Klesan - 林克孝', url: 'https://www.books.com.tw/products/0010456953' },
      ],
    }
  };

  const trackInfo = {
    // work around. source: https://github.com/vercel/next.js/issues/11993
    tracks: JSON.parse(JSON.stringify(tracks)),
    points: JSON.parse(JSON.stringify(points)), //_id is not plain object
    overviews: overviews[id],
    summary: summarys[id],
  }
  return trackInfo;
};
