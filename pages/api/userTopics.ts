import { NextApiRequest, NextApiResponse } from "next"
import { MongoClient } from 'mongodb';

// Return a promise of an array of strings.
//
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username } = req.query;
  var url = process.env.DB_HOST as string;
  
  const mongo = new MongoClient(url, { useUnifiedTopology: true });

  try {
    const client = await mongo.connect();

    // an invalid username will result in TypeError. This shouldn't be a problem but...
    const { topics } = await client
      .db("stufftoknow")
      .collection("users")
      .findOne({ user: username });

    res.status(200).send(topics)
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  } finally {
    mongo.close();
  }

}

