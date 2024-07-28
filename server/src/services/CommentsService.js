import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"



class CommentsService {
    async deleteComment(commentId, userId) {
        const commentToDelete = await dbContext.Comments.findById(commentId).populate('creator')
        if(userId != commentToDelete.creatorId) {
            throw new Forbidden('You are not able to delete a comment you did not create.')
        }
        await commentToDelete.deleteOne()
        return 'Comment was deleted'
    }

    async getEventComments(eventId) {
       const comments = await dbContext.Comments.find({eventId : eventId}).populate('creator') 
       return comments
    }

    async createComment(commentData) {
        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator')
        return comment
    }
  
}

export const commentsService = new CommentsService()