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
      const currentAuthor = await User.findOne({username: blurbSeeds[i].blurbAuthor});
      const cleanComments =  blurbSeeds[i].comments > 0 ? blurbSeeds[i].comments.map(async (comment) => {
        const newComment = {...comment}
        const commentAuthor = await User.findOne({username: newComment.commentAuthor});
        newComment.commentAuthor = commentAuthor._id
        return newComment;
      }) : []
      const newBlurb = await Blurbs.create({...blurbSeeds[i], blurbAuthor: currentAuthor._id, comments: cleanComments});
      const user = await User.findOneAndUpdate(
        { _id: currentAuthor._id },
        {
          $addToSet: {
            blurbs: newBlurb._id,
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
