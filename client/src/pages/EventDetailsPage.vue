<script setup>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { computed, onMounted } from 'vue';
import { towerEventsService } from '../services/TowerEventsService.js';
import Pop from '../utils/Pop.js';
import ActiveTowerEvent from '../components/activeTowerEvent.vue';


const route = useRoute()

const towerEvent = computed(() => AppState.activeTowerEvent)

onMounted(() => {
    getTowerEventById()
})

async function getTowerEventById() {
    try {
        await towerEventsService.getTowerEventById(route.params.eventId)
    }
    catch (error){
      Pop.error(error);
    }
}
</script>


<template>

<section class="container">
    <div v-if="towerEvent" class="row">
        <div class="col-10">
            <h1>This is the details page for a single event.</h1>
            <img class="img-fluid" :src="towerEvent.coverImg" alt="">
            {{ towerEvent.name }}
        </div>
        <div class="row">
            <div class="col-7">
                <!-- <ActiveTowerEvent/> -->
                <div>
                    <!-- TODO Comment Section -->
                    <h4>See what folks are saying...</h4>
                    <form>
                        <textarea name="comment-section" id="comment-section" placeholder="Tell the people..."></textarea>
                        <button class="btn btn-success">Post Comment</button>
                    </form>
                </div>
            </div>
            <div class="col-3">
                <div class="tickets text-center">
                    <h4>Interested in going?</h4>
                    <p>Grab a ticket</p>
                    <button class="btn btn-primary">Attend</button>
                </div>
                <div>
                    <h4>Attendees</h4>
                    <!-- Attendees Section -->
                    <div>

                    </div>
                </div>
            </div>

        </div>
    </div>
    <div v-else>
        <h2><i class="mdi mdi-loading mdi-spin"></i>Loading</h2>
    </div>
</section>

</template>


<style lang="scss" scoped>

</style>