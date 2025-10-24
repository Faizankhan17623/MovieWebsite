// ...existing code...
const mongoose = require('mongoose')
const { ROLES, EXPERIENCE_LEVELS } = require('./Org_data')
const AffiliationSchema = new mongoose.Schema({
  unionName: { type: String, trim: true, required: true },
  membershipId: { type: String, trim: true, required: true },
  yearJoined: { type: Number, required: true },
  expiryDate: { type: Date, required: true }
}, { _id: false })

const ProducerExperienceSchema = new mongoose.Schema({
  Resume: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        if (!v) return false;
        const s = String(v).trim();
        return /\.(pdf)(?:[?#].*)?$/i.test(s);
      },
      message: 'Resume must be a PDF file (filename or URL ending with .pdf)'
    }
  },

   Role: {
        type: String,
        enum: ROLES,
        required: true
    },
    ExperienceLevel: {
        type: String,
        enum: EXPERIENCE_LEVELS,
        required: true
    },
    
  Funding: {
    type: [String],
    default: []
  },

  Affiliation: {
    type: Boolean,
    required: true,
    default: false
  },

  AffiliationDetails: {
    type: AffiliationSchema,
    required: function () { return this.Affiliation === true }
  },

  TeamSize: {
    type: Number,
    required: true,
    min: 0
  },

  TotalProjects: {
    type: Number,
    required: true,
    min: 0
  },

  RiskManagement: {
    type: String,
    required: true,
    set: v => (typeof v === 'string' ? v.trim() : v),
    validate: {
      validator: function (v) {
        if (typeof v !== 'string') return false;
        const wordCount = v.trim().split(/\s+/).filter(Boolean).length;
        return wordCount <= 250;
      },
      message: props => `${props.path} cannot exceed 250 words!`
    }
  }

}, { timestamps: true })

module.exports = mongoose.model("ProducerExperience", ProducerExperienceSchema)
// ...existing code...