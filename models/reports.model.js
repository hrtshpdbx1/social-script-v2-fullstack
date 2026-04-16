//reportmodel.js
const { Schema, model, Types } = require('mongoose');

const reportSchema = new Schema({
    reportType: {
        type: String,
        enum: ['offensive_content',
            'unrealistic_scenario',
            'unclear_instructions',
            'other'],
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    reporterId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'dismissed'],
        default: 'pending'
    },
    reviewedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    reviewedAt: {
        type: Date,
        required: false,
    },
    scenarioId: {
        type: Schema.Types.ObjectId,
        ref: 'Scenario'
    }
}, {

    collection: 'reports',
    timestamps: true

})

const Report = model('Report', reportSchema)

module.exports = Report;