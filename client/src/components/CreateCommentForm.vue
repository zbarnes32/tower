<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { commentsService } from '../services/CommentsService.js';



    const route = useRoute()

    const commentData = ref({
        eventId: route.params.eventId,
        body: ''
    })

    async function createComment(){
        try {
          await commentsService.createComment(commentData.value)
          Pop.success('Comment was created!')
          resetForm()
        }
        catch (error){
          Pop.error(error);
        }
    }

    function resetForm(){
        commentData.value = {
            eventId: route.params.eventId,
            body: ''
        }
    }
</script>


<template>
<form class="container-fluid" @submit.prevent="createComment()">
    <div class="row">
        <div class="col-12">
            <p class="fs-2 text-center">Comments</p>

        </div>
    </div>
    <div class="col-12">
        <!-- <label for="comment-body">Comment</label> -->
        <textarea v-model="commentData.body" name="comment-body" id="comment-body" required maxlength="1000" placeholder="What are your thoughts..."></textarea>
    </div>
    <div class="col-12 text-end">
        <button class="btn btn-success">Submit</button>
    </div>
</form>
</template>


<style lang="scss" scoped>

textarea {
    width: 100%;
}

</style>