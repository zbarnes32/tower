<script setup>
import { ref } from 'vue';
import { towerEventsService } from '../services/TowerEventsService.js';
import Pop from '../utils/Pop.js';
import { Modal } from 'bootstrap';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()




const towerEventData = ref({
   name: '',
   coverImg: '',
   description: '',
   startDate: new Date().toLocaleDateString(),
   location: '',
    type: '',
    capacity: 0
})

async function createTowerEvent() {
    try {
        const newTowerEvent = await towerEventsService.createTowerEvent(towerEventData.value)
        Pop.success('You have created an event!')
        clearForm()
        Modal.getOrCreateInstance('#eventFormModal').hide()
        router.push({name: 'Event Details', params: {eventId: newTowerEvent.id}})
    } catch (error) {
        Pop.error(error)
    }

function clearForm(){
towerEventData.value = {
    name: '',
   coverImg: '',
   description: '',
   startDate: '',
   location: '',
    type: '',
    capacity: 0
    }
}

}


</script>


<template>
<form class="container-fluid" @submit.prevent="createTowerEvent()">
    <section class="row">
        <div class="col-3 mb-3">
            <label for="event-name">Event Name</label>
            <input v-model="towerEventData.name" type="text" class="form-control" id="event-name" name="event-name" minlength="3" maxlength="50" required>
        </div>
        <div class="col-3 mb-3">
            <label for="event-location">Location</label>
            <input v-model="towerEventData.location" type="text" class="form-control" id="event-location" name="event-location" minlength="1" maxlength="500" required>
        </div>
        <div class="col-3 mb-3">
            <label for="event-capacity">Capacity</label>
            <input v-model="towerEventData.capacity" type="number" class="form-control" id="event-capacity" name="event-capacity" min="1" max="5000" required>
        </div>
        <div class="col-3 mb-3">
            <div class="form-group">
                <label for="event-type">Event Type</label>
                    <select v-model="towerEventData.type" class="form-control" id="event-type" name="event-type" required>
                        <option value="" disabled>Please select an event type</option>
                        <option value="concert">Concert</option>
                        <option value="convention">Convention</option>
                        <option value="sport">Sport</option>
                        <option value="digital">Digital</option>
                    </select>
            </div>
        </div>
        <div class="col-3 mb-3">
            <label for="event-date">Date</label>

            <!-- FIXME use a datepicker here -->
            <input v-model="towerEventData.startDate" type="text" class="form-control" id="event-date" name="event-date" minlength="1" maxlength="500" required>
        </div>
        <div class="col-3 mb-3">
            <label for="event-picture">Add a picture</label>
            <input v-model="towerEventData.coverImg" type="text" class="form-control" id="event-picture" name="event-picture" minlength="1" maxlength="1000" required>
        </div>
    </section>
    <section class="row">
        <div class="col-10">
            <label for="event-description" class="form-label">Enter the event description here...</label>
            <textarea v-model="towerEventData.description" class="form-control" id="event-description" rows="5" name="event-description" minlength="15" maxlength="1000"></textarea>
        </div>
    </section>
    <section>
        <div>
            <button type="submit" class="btn btn-primary">Save changes</button>
        </div>
    </section>
</form>
</template>


<style lang="scss" scoped>

</style>