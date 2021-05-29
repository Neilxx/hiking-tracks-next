const mongoose = require('mongoose');
import { resolve } from 'path'

const _ = require('lodash');
import dbConnect from '../../utils/dbConnect'
import Point from '../../models/Point'
import Photo from '../../models/Photo'
import moment from 'moment';
const sqip = require('sqip').default
// await Point.deleteMany({});
// await Photo.deleteMany({});

export default async (req, res) => {
  const connect = await dbConnect();
  const points = await Point.find({ _trackId: '6050a26e8a62c1cc17100fd2' }).populate('photos');
  const options = {
    "plugins": [
      {
        "name": "primitive",
        "options": {
          "numberOfPrimitives": 10,
          "mode": 8,
        }
      },
      "svgo",
      "data-uri",
    ]
  }

  // const photos = [...points].map(point => point.photos).flat();



    // const result =  await sqip({
    //   input: '/Users/neilxx/Project/hiking-tracks/public/images/60322b18b69d64f0ce86c6a5/20200228_084620.jpg',
    //   output: '/Users/neilxx/Project/hiking-tracks/public/images/60322b18b69d64f0ce86c6a5/out_d_n10.svg'.jpg',
    //   input: '/Users/neilxx/Project/hiking-tracks/public/images/test.jpg',
    //   output: '/Users/neilxx/Project/hiking-tracks/public/images/potrace.svg',
    //   input: resolve(__dirname, '/Users/neilxx/Project/hiking-tracks/public/images/test2'),
    //   output: resolve(__dirname, '/Users/neilxx/Project/hiking-tracks/public/images/gif'),

      // numberOfPrimitives: 10,
    //   ...options
    // });

    for (const point of points) {
      for (const photo of point.photos) {
        if (photo.placeholder) continue;
        try {
          const result =  await sqip({
            input: `/Users/neilxx/Project/hiking-tracks/public/images/6050a26e8a62c1cc17100fd2/${photo.fileName}`,
            ...options,
          })
          photo.placeholder = result.metadata.dataURI;
          await photo.save();
          console.log(photo.fileName);
        } catch (err) {
          console.log('error file name: ', photo.fileName)
          console.error(err)
        }
      }
    }


  res.status(200).json({ name: 'test success' })
}
