import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class CommentsService {
    async deleteComment(commentId) {
        const response = await api.delete(`api/comments/${commentId}`)
        logger.log('Deleting comment', response.data)
        const commentIndexToDelete = AppState.eventComments.findIndex(comment => comment.id == commentId)
        AppState.eventComments.splice(commentIndexToDelete, 1)
    }
    async getEventComments(eventId) {
        AppState.eventComments = []
        const response = await api.get(`api/events/${eventId}/comments`)
        logger.log('Getting the event comments', response.data)
        const comments = response.data.map(commentData => new Comment(commentData))
        AppState.eventComments = comments
    }
    async createComment(commentData) {
       const response = await api.post('api/comments', commentData) 
       logger.log('creating comment', response.data)
       const newComment = new Comment(response.data)
       AppState.eventComments.unshift(newComment)
    }

}

export const commentsService = new CommentsService()