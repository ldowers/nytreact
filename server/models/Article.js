import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String
  },
  date: {
    type: Date
  },
  url: {
    type: String
  },
  note: {
    type: String
  }
});

ArticleSchema.method({});

ArticleSchema.statics = {
    list(limit) {
      if (!limit) {
        limit = 5;
      }
      return this.find().limit(limit).exec();
    }
};

export default mongoose.model("Article", ArticleSchema);
