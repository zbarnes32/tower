<script setup>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { computed, onMounted } from 'vue';
import { towerEventsService } from '../services/TowerEventsService.js';
import Pop from '../utils/Pop.js';
import ActiveTowerEvent from '../components/activeTowerEvent.vue';
import { api } from '../services/AxiosService.js';
import { logger } from '../utils/Logger.js';
import { TowerEvent } from '../models/TowerEvent.js';
import { accountService } from '../services/AccountService.js';
import { Account } from '../models/Account.js';



const route = useRoute()

const towerEvent = computed(() => AppState.activeTowerEvent)

const account = computed(() => AppState.account)

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

async function cancelEvent(){
    try {
      const wantsToCancel = await Pop.confirm("Are you sure you want to cancel this event")
      if(!wantsToCancel) return
      await towerEventsService.cancelEvent(route.params.eventId)
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
            <h1>{{ towerEvent.name }}</h1>
            <span v-if="towerEvent.isCanceled == true" class="cancel-message">This event has been canceled</span>
            <span v-else>This event is scheduled for {{ towerEvent.startDate.toLocaleDateString() }} </span>

            <img class="img-fluid" :src="towerEvent.coverImg" alt="">
        </div>
        <div class="row">
            <div class="col-7">
                <div v-if="account?.id == towerEvent.creatorId && towerEvent.isCanceled == false" class="cancelEvent">
                    <button @click="cancelEvent()" class="btn btn-danger">Cancel Event</button>
                </div>
                <div v-if="account?.id == towerEvent.creatorId && towerEvent.isCanceled == true">
                    <button @click="cancelEvent()" class="btn btn-success">Reopen Event</button>
                </div>
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


.cancel-message {
    color: red;
    font-size: 1.5em;
    font-weight: 700;
}
</style>