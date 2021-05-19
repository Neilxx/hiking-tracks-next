  const mongoose = require('mongoose');
const _ = require('lodash');
import dbConnect from '../../utils/dbConnect'
import Point from '../../models/Point'
import Photo from '../../models/Photo'
import moment from 'moment';

// await Photo.deleteMany({});

export default async (req, res) => {
  const connect = await dbConnect();
  var ObjectId = mongoose.Types.ObjectId;
  // const points = await Point.find({ _trackId: ObjectId('60322b18b69d64f0ce86c6a5') });
  // for (const point of points) {
  //   point.photos = _.get(point, ['photos', 0]) || [];
  //   await point.save()
  // }


  res.status(200).json({ name: 'delete success' })
}
