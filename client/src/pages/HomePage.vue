<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import Pop from '../utils/Pop.js';
import { TowerEvent } from '../models/TowerEvent.js';

const towerEvents = computed(() => AppState.towerEvents)

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
      <h2>How Tower Works</h2>
    </div>
    <div class="col-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title"><i class="mdi mdi-magnify"></i>Discover events you are interested in</h5>
          <p class="card-subtitle mb-2 text-muted">Browse through community hosted events for all the things you love</p>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Start an event to invite your friends</h5>
          <p class="card-subtitle mb-2 text-muted">Create your own Tower event, and draw from a community of thousands</p>
          <button class="btn btn-outline-success rounded pill p-1 mt-3"><i class="mdi mdi-plus"></i>Create an event</button>     
        </div>
      </div>
    </div>
  </div>
</section>

<section class="container">
  <h2>Explore top categories</h2>

  <!-- TODO Iterate through categories -->
  <div>
    <div class="card">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</section>

<section class="container">
  <div class="row">
    <h2 class="mt-5">Upcoming Events</h2>
    <div class="col-10 d-flex justify-content-around">
        <!-- TODO Iterate through events -->
        <div class="tower-event-card" v-for="towerEvent in towerEvents" :key="towerEvent.id">
          <img :src="towerEvent.coverImg" class="tower-event-card-img" :alt="towerEvent.type">
          <div class="card-body">
          <h5 class="card-title text-center">{{ towerEvent.name }}</h5>
        <!-- REVIEW Could add more event details later. Only the Image and Title are required -->
        </div>

      </div>
    </div>
  </div>
</section>


</template>

<style scoped lang="scss">

.bg-hero {
  background-image: url(https://s3-alpha-sig.figma.com/img/de71/12a0/0a7ec0092896027294a687cb102512de?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=edaDOMurT1-sTq2NbsOsdZxKSdtVv56sUysEiFjVz8Kt-g9vuPXdLtWuKkGfxZrbsmpiqFF0ri~n1dtL~uqKGmOHLMOqZc89vHLywqFBWCn29VFl15LeQKO96BlbpOqGGn9gpyo-hybN2cMeuTzTaV3e4WSNN~9fc0FTNF-oGiQuxBKq6OlMVWgrGdKqYutrDzJQj5u2fkTyCX7Y17ecT4g5bry4BGnEhLR6HHBxfjbSbItbvjbvUj3TEtGaXt1flJ79e3M8BI~GIR6UAuim3uGx5eozG7Qg9Tw1Ntadmbe8n~AJ2GKW2oPWrla34eHxPOTIqvMEiovk8B05MQ-H3Q__);
  background-position: center;
  background-size: cover;
  height: 40vh;
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
</style>
