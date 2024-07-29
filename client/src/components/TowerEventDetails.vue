<script setup>
import { RouterLink } from 'vue-router';
import { TowerEvent } from '../models/TowerEvent.js';

defineProps({towerEvent: TowerEvent})
</script>


<template>
    <RouterLink :to="{name:'Event Details', params: {eventId: towerEvent.id}}">
        <div class="tower-event-card mb-4">
          <img :src="towerEvent.coverImg" class="tower-event-card-img img-fluid" :alt="towerEvent.type">
          <div class="card-body">
          <h5 class="event-title">{{ towerEvent.name }}</h5>
          <p class="quick-details">Date:  {{ towerEvent.startDate.toLocaleDateString() }}</p>
          <p class="quick-details">Location: {{ towerEvent.location }}</p>
        <!-- REVIEW Could add more event details later. Only the Image and Title are required -->
        </div>

      </div>
    </RouterLink>
</template>


<style lang="scss" scoped>

.tower-event-card {
  height: 15em;
  width: 15em;
  border: 1px solid black;
}

.tower-event-card-img {
  height: 10em;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.event-title {
  font-size: 16px;
  font-style: bold;
  color: black;
}

.quick-details{
  font-size: 12px;
  color: darkslategray;
  margin-bottom: 0;
}

</style>