const db = require('../config/connection');
const { User, Blurbs } = require('../models');
const userSeeds = require('./userSeeds.json');
const blurbSeeds = require('./blurbSeeds.json');
const cleanDB = require('./cleanDB');



db.once('open', async () => {
  try {

    await cleanDB("User", "users");
    await cleanDB("Blurbs", "blurbs");

    await User.create(userSeeds);

    for (let i = 0; i < blurbSeeds.length; i++) {
      const { _id, blurbAuthor } = await Blurbs.create(blurbSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: blurbAuthor },
        {
          $addToSet: {
            blurbs: _id,
          },
        }
      );
    }

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
