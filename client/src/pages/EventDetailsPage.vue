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
import { Ticket } from '../models/Ticket.js';
import App from '../App.vue';
import { commentsService } from '../services/CommentsService.js';
import ModalWrapper from '../components/ModalWrapper.vue';
import CreateCommentForm from '../components/CreateCommentForm.vue';



const route = useRoute()

const towerEvent = computed(() => AppState.activeTowerEvent)

const account = computed(() => AppState.account)

const eventProfiles = computed(() => AppState.eventProfiles)

const ticketHolder = computed(() => {
    if(!AppState.account){
        logger.log('Appstate Account not ready.')
    }
    if(AppState.eventProfiles && AppState.account){
        const foundTicket = AppState.eventProfiles.find(ticket => ticket.accountId == AppState.account.id)
        logger.log('AppState.eventProfile:', AppState.eventProfiles)
        logger.log('AppState.account:',AppState.account)
        logger.log('Found Ticket:', foundTicket)
        return foundTicket
    }
    return null
})

const comments = computed(() => AppState.eventComments)


// TODO go get people that have tickets for event when this page mounts, use eventId form route params for the request, reference get AlbumMemberProfiles from postit

// TODO comments are similar to pictures
onMounted(() => {
    getTowerEventById()
    getTicketsForEvent()
    getEventComments()
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

async function getEventComments(){
    try {
      await commentsService.getEventComments(route.params.eventId)
    }
    catch (error){
      Pop.error(error);
    }
}

async function deleteComment(commentId){
    try {
      const wantsToDelete = await Pop.confirm("Are you sure?")
      if(!wantsToDelete) return
      await commentsService.deleteComment(commentId)
    }
    catch (error){
      Pop.error(error);
    }
}
</script>


<template>

<section class="container">
    <div v-if="towerEvent" class="row">
        <div class="col-12">
            <h1 class="text-center my-3">{{ towerEvent.name }}</h1>
            <div class="mb-2">
                <span v-if="towerEvent.isCanceled == true" class="cancel-message">This event has been canceled</span>
                <span v-else-if="towerEvent.capacity == towerEvent.ticketCount" class="sold-out-message">This event is sold out</span>
                <span v-else class="fs-5">This event is scheduled for:  <b>{{ towerEvent.startDate.toLocaleDateString() }}</b></span>
            </div>

            <img class="img-fluid w-100 mt-2 mb-3 image-background" :src="towerEvent.coverImg" alt="">

            <!-- TODO add description, location, type from towerevent -->
            <p>{{ towerEvent.description }}</p>
        </div>
        <div class="row">
            <div class="col-7">
                <p><b>Location: </b>{{ towerEvent.location }}</p>
                <p><b>Event Type: </b>{{ towerEvent.type }}</p>
                <div v-if="account?.id == towerEvent.creatorId && towerEvent.isCanceled == false" class="cancelEvent">
                    <button @click="cancelEvent()" class="btn btn-danger">Cancel Event</button>
                </div>
                <div v-if="account?.id == towerEvent.creatorId && towerEvent.isCanceled == true">
                    <button @click="cancelEvent()" class="btn btn-success">Reopen Event</button>
                </div>
                <!-- <ActiveTowerEvent/> -->
                <div>
                    <!-- TODO Comment Section -->
                    <div class="mb-5">
                        <CreateCommentForm/>
                        <div v-for="comment in comments" :key="comment.id" class="col-12 rounded mb-2 comment-card mt-3 p-2">
                            <div class="d-flex align-items-center">
                                <img class="img-fluid comment-profile-picture" :src="comment.creator.picture" alt="Profile Picture">
                                <p class="fs-5">{{ comment.creator.name }}</p>
                            </div>
                            <div class="pt-4">
                                <p>{{ comment.body }}</p>
                            </div>
                            <div v-if="comment.creatorId == AppState.account.id" class="text-end">
                                <button class="btn btn-danger" @click="deleteComment(comment.id)"><i class="mdi mdi-delete"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- TODO Add UI indication to show if the account profile has a ticket to the event -->
            <!-- NOTE Can we compare the account profile's eventId to the activeTowerEvent's id?? -->
            <div class="col-5">
                <div class="tickets text-center">
                    <div v-if="ticketHolder">
                        <h4>You are attending this event!</h4>
                    </div>
                    <div v-else>
                        <h4>Interested in going?</h4>
                        <p>Grab a ticket</p>
                    </div>
                    <div>
                        <p>Tickets Remaining: {{ towerEvent.capacity - towerEvent.ticketCount }}</p>
                    </div>
                    <div v-if="towerEvent.isCanceled == true">
                        <button disabled @click="createTicket()" class="btn btn-primary mb-4">Get a Ticket</button>
                    </div>
                    <div v-else-if="towerEvent.capacity <= towerEvent.ticketCount">
                        <button disabled @click="createTicket()" class="btn btn-primary mb-4">Get a Ticket</button>
                    </div>
                    <div v-else><button @click="createTicket()" class="btn btn-primary mb-4">Get a Ticket</button></div>
                </div>
                    <div class="mt-3 attendees-section rounded">
                    <p class="fs-3 text-center">Event Attendees</p>
                    <hr/>
                        <div class="row g-1 pb-2">
                            <div v-for="ticket in eventProfiles" :key="ticket.id" class="d-flex align-items-center">
                            <img class="img-fluid profile-picture" :src="ticket.profile.picture" alt="Profile Picture">
                            <p class="fs-5">{{ ticket.profile.name }}</p>
                            </div>          
                        </div>
                    </div>
            </div>
        </div>
    </div>
    <div v-else>
        <h2><i class="mdi mdi-loading mdi-spin"></i>Loading</h2>
    </div>

     <!-- Attendees Section -->
    <!-- <div class="row">
        <div class="col-md-4">
            <h4>Event Attendees</h4>
            <div class="row g-1">
                <div v-for="ticket in eventProfiles" :key="ticket.id" class="col-md-4">
                    <img class="img-fluid" :src="ticket.profile.picture" alt="Profile Picture">
                    <p class="fs-5">{{ ticket.profile.name }}</p>
                </div>          
            </div>
        </div>
    </div> -->
</section>


</template>


<style lang="scss" scoped>


.cancel-message {
    color: red;
    font-size: 1.5em;
    font-weight: 700;
}

.sold-out-message {
    color: red;
    font-size: 1.5em;
    font-weight: 700;
}

.image-background {
    object-fit: cover;
    object-position: center;
    height: 100vh;
}

.profile-picture {
    object-fit: cover;
    object-position: center;
    aspect-ratio: 1/1;
    border-radius: 50%;
    height: 4em;
    margin-left: 1em;
    margin-right: 3em;
}

.comment-profile-picture {
    object-fit: cover;
    object-position: center;
    aspect-ratio: 1/1;
    border-radius: 50%;
    height: 4em;
    margin-left: 1em;
    margin-right: 1em;
}

.attendees-section {
    background-color: rgb(206, 221, 242);
}

.comment-card {
    border: 1px solid black;
}
</style>