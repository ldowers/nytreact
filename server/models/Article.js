import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

ArticleSchema.method({});

ArticleSchema.statics = {
    list() {
      return this.find().exec();
    },

    save(title, date, url) {
      return this.create({
        title: title,
        date: date,
        url: url
        }).exec();
    },

    remove(articleID) {
      return this.findOneAndRemove({"_id": articleID}).exec();
    }
};

export default mongoose.model("Article", ArticleSchema);