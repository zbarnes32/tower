<script setup>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import Pop from '../utils/Pop.js';
import { TowerEvent } from '../models/TowerEvent.js';
import TowerEventDetails from '../components/TowerEventDetails.vue';
import CreateEventForm from '../components/CreateEventForm.vue';
import ModalWrapper from '../components/ModalWrapper.vue';

const eventTypeFilter = ref('all')

const towerEvents = computed(() => {
  if (eventTypeFilter.value == 'all'){
    return AppState.towerEvents
  }
  return AppState.towerEvents.filter(towerEvent => towerEvent.type == eventTypeFilter.value)
})

const types = ['all', 'concert', 'convention', 'sport', 'digital']

onMounted(() => {
  getAllTowerEvents()
})


async function getAllTowerEvents(){
  try {
    await towerEventsService.getAllTowerEvents()
  }
  catch (error){
    Pop.error(error);
  }
}

</script>

<template>
<section class="container-fluid">
  <div class="row bg-hero align-items-end">
    <div class="col-12">
      <div class="text-light">
        <h1>Welcome to Tower</h1>
        <!-- TODO replace text -->
        <p class="fs-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus itaque dolorum nihil quae iure qui eaque, numquam temporibus molestias quidem dolorem obcaecati sunt fugit debitis dicta atque sit reiciendis quasi.</p>
      </div>
    </div>
  </div>
</section>

<section class="container">
  <div class="row d-flex justify-content-around mt-3">
    <div class="pb-4">
      <h2 class="text-center">How Tower Works</h2>
    </div>
    <div class="col-md-4 mt-1">
      <div class="card hiw-card">
        <div class="card-body">
          <h5 class="card-title"><i class="mdi mdi-magnify"></i>   Discover events near you</h5>
          <p class="card-subtitle mb-2 text-muted">Browse through community hosted events for all the things you love</p>
        </div>
      </div>
    </div>
    <div class="col-md-4 mt-1">
      <div class="card hiw-card">
        <div class="card-body">
          <h5 class="card-title">Start an event to invite your friends</h5>
          <p class="card-subtitle mb-2 text-muted">Create your own Tower event, and draw from a community of thousands</p>
          <div class="text-end">
            <button class="btn btn-outline-primary rounded pill p-1 mt-3" data-bs-target="#eventFormModal" data-bs-toggle="modal"><i class="mdi mdi-plus"></i>Create an event</button>
          </div>
            <ModalWrapper id="eventFormModal">
              <CreateEventForm/>
            </ModalWrapper>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="container">
  <div class="row mt-5 justify-content-around">
    <div class="col-12">
      <h2 class="text-center">Explore Top Categories</h2>
      <hr/>
    </div>
    <div class="col-md-2 mt-3" v-for="type in types" :key="type">
      <button @click="eventTypeFilter = type" class="text-capitalize btn btn-primary p-3 rounded pill text-center type-buttons">
          {{ type }}
      </button>
    </div>
  </div>
</section>

<section class="container">
  <div class="row mt-5 justify-content-around">
    <div class="text-center">
      <h2 class="mb-3">Upcoming Events</h2>
      <hr/>
    </div>
    <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-md-3 col-12">
        <TowerEventDetails :towerEvent="towerEvent"/>
    </div>
  </div>
</section>


</template>

<style scoped lang="scss">

.bg-hero {
  background-image: url(https://s3-alpha-sig.figma.com/img/de71/12a0/0a7ec0092896027294a687cb102512de?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=edaDOMurT1-sTq2NbsOsdZxKSdtVv56sUysEiFjVz8Kt-g9vuPXdLtWuKkGfxZrbsmpiqFF0ri~n1dtL~uqKGmOHLMOqZc89vHLywqFBWCn29VFl15LeQKO96BlbpOqGGn9gpyo-hybN2cMeuTzTaV3e4WSNN~9fc0FTNF-oGiQuxBKq6OlMVWgrGdKqYutrDzJQj5u2fkTyCX7Y17ecT4g5bry4BGnEhLR6HHBxfjbSbItbvjbvUj3TEtGaXt1flJ79e3M8BI~GIR6UAuim3uGx5eozG7Qg9Tw1Ntadmbe8n~AJ2GKW2oPWrla34eHxPOTIqvMEiovk8B05MQ-H3Q__);
  background-position: center;
  background-size: cover;
  height: 60vh;
}

.tower-event-card{
  width: 20em;
  background-color: rgb(225, 225, 225);
  margin: 1em;
  border: 1px solid black;
}

.tower-event-card-img{
  height: 10em;
  object-fit: cover;
  object-position: center;
  width: 100%;

}

.hiw-card{
  height: 10em;
}

.type-buttons{
  width: 10em;
  font-size: 1em;
  font-weight: 600;
}
</style>
