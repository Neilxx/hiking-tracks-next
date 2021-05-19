const mongoose = require('mongoose');
const _ = require('lodash');
import dbConnect from '../../utils/dbConnect'
import Point from '../../models/Point'
import Photo from '../../models/Photo'
import moment from 'moment';

// await Point.deleteMany({});
// await Photo.deleteMany({});

export default async (req, res) => {
  const connect = await dbConnect();
  const { trackPoints } = await import(`../../public/tracks/607aa95447d537147a4a1d0a/trackPoints.js`);
  const _trackId = new mongoose.Types.ObjectId('607aa95447d537147a4a1d0a');

  // for (const feature of trackPoints.features) {
  //   const { description, name, time, ele: elevation } = feature.properties;
  //   const { coordinates: [longitude, latitude]} = feature.geometry;
  //   const point = await Point.create({
  //     name, description, time, latitude, longitude, elevation, _trackId,
  //   })
  //   console.log(name)
  //   await Photo.create({
  //     point: point._id,
  //     fileName: `${moment(point.time).format('YYYYMMDD_HHmmss')}.jpg`,
  //   })
  // }

  // const points = await Point.find({});
  // for (const point of points) {
  //   const photo = await Photo.findOne({ point: point })
  //   point.photos.push(photo)
  //   await point.save()
  // }

  res.status(200).json({ name: 'create success' })
}
