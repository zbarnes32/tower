import { Schema } from "mongoose";




export const CommentSchema = new Schema({
    creatorId: {type: Schema.ObjectId, required: true, ref: 'Account'},
    eventId: {type: Schema.ObjectId, required: true, ref: 'TowerEvent'},
    body: {type: String, required: true, minlength: 1, maxlength: 1000},
}, { timestamps: true, toJSON:{ virtuals: true } })

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})