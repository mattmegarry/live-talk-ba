const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paperstackSchema = new Schema({
  name: String,
  description: String,
  papers: [{
    title: String,
    text: String
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Paperstack = mongoose.model('Paperstack', paperstackSchema);

// module.exports = Paperstack;
