  const mongoose = require('mongoose');
const _ = require('lodash');
import dbConnect from '../../utils/dbConnect'
import Point from '../../models/Point'
import Photo from '../../models/Photo'
import moment from 'moment';

// await Photo.deleteMany({});

export default async (req, res) => {
  // const connect = await dbConnect();
  // var ObjectId = mongoose.Types.ObjectId;
  // const points = await Point.find({ _trackId: ObjectId('607aa95447d537147a4a1d0a') });
  // for (const point of points) {
  //   await Photo.findOneAndRemove({ point: point })
  // }

  // await Point.deleteMany({ _trackId: ObjectId('607aa95447d537147a4a1d0a') });


  // res.status(200).json({ name: 'delete success' })
}
