<script setup>
import { RouterLink } from 'vue-router';
import { TowerEvent } from '../models/TowerEvent.js';

defineProps({towerEvent: TowerEvent})
</script>


<template>
    <RouterLink :to="{name:'Event Details', params: {eventId: towerEvent.id}}">
        <div class="tower-event-card">
          <img :src="towerEvent.coverImg" class="tower-event-card-img" :alt="towerEvent.type">
          <div class="card-body">
          <h5 class="card-title text-center">{{ towerEvent.name }}</h5>
        <!-- REVIEW Could add more event details later. Only the Image and Title are required -->
        </div>

      </div>
    </RouterLink>
</template>


<style lang="scss" scoped>

</style>