const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const extractionSchema = new Schema({
  name: String,
  fakeExtractionTextPlaceholder: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Extraction = mongoose.model('Extraction', extractionSchema);

// module.exports = Extraction;
