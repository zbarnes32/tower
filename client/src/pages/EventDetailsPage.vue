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
import { ticketsService } from '../services/TicketsService.js';



const route = useRoute()

const towerEvent = computed(() => AppState.activeTowerEvent)

const account = computed(() => AppState.account)

const eventProfiles = computed(() => AppState.eventProfiles)

// TODO go get people that have tickets for event when this page mounts, use eventId form route params for the request, reference get AlbumMemberProfiles from postit

// TODO comments are similar to pictures
onMounted(() => {
    getTowerEventById()
    getTicketsForEvent()
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
        // TODO if you don't want to display the confirm, check to see if the event in the appstate is
      const wantsToCancel = await Pop.confirm("Are you sure you want to cancel this event")
      if(!wantsToCancel) return
      await towerEventsService.cancelEvent(route.params.eventId)
    }
    catch (error){
      Pop.error(error);
    }
}

async function createTicket(){
    try {
      const ticketData = {eventId: route.params.eventId}
        await ticketsService.createTicket(ticketData)
    }
    catch (error){
      Pop.error(error);
    }
}

async function getTicketsForEvent() {
    try {
      await ticketsService.getTicketsForEvent(route.params.eventId)
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
            <!-- TODO add description, location, type from towerevent -->
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
            <!-- TODO Add UI indication to show if the account profile has a ticket to the event -->
            <!-- NOTE Can we compare the account profile's eventId to the activeTowerEvent's id?? -->
            <!-- REVIEW Why isn't the capacity going down by 1 after each created ticket? -->
            <div class="col-3">
                <div class="tickets text-center">
                    <div>
                        <h4>Interested in going?</h4>
                        <p>Grab a ticket</p>
                    </div>
                    <!-- FIXME capacity isn't the only thing we need to look at here, we need to compare the ticketCount -->
                    <div>
                        <p>Tickets Remaining: {{ towerEvent.capacity - towerEvent.ticketCount }}</p>
                    </div>
                    <div v-if="towerEvent.isCanceled == false">
                        <button @click="createTicket()" class="btn btn-primary">Get a Ticket</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <h2><i class="mdi mdi-loading mdi-spin"></i>Loading</h2>
    </div>

     <!-- Attendees Section -->
    <div class="row">
        <div class="col-md-4">
            <h4>Event Attendees</h4>
            <div class="row g-1">
                <div v-for="ticket in eventProfiles" :key="ticket.id" class="col-md-4">
                    <img class="img-fluid" :src="ticket.profile.picture" alt="Profile Picture">
                    <p class="fs-5">{{ ticket.profile.name }}</p>
                </div>          
            </div>
        </div>
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