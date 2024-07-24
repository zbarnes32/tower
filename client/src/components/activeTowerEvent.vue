<script setup>
import { RouterLink } from 'vue-router';
import { TowerEvent } from '../models/TowerEvent.js';



defineProps({towerEvent: TowerEvent})
</script>


<template>
    <h1>Active Tower Event</h1>
    <!-- FIXME: Need to rework -->
    <!-- <RouterLink :to="{name: 'Event Details', params: {eventId: towerEvent.id}}">
        <div>
            <h2>{{ towerEvent.name }}</h2><span>{{ towerEvent.type }}</span>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam sed nulla ex ipsum natus veritatis sapiente ad eaque facilis aspernatur nemo adipisci illum similique quaerat ipsam voluptas, quis at? Quo voluptas a provident blanditiis commodi! Aut, inventore, rerum facere nulla, dolore vero ut perferendis animi repudiandae labore ipsam asperiores eum!</p>
            <h5>Date and Time</h5>
            <p><i class="mdi mdi-calendar"></i>Starts {{ towerEvent.startDate }}</p>
            <h5>Location</h5>
            <p><i class="mdi mdi-map-marker"></i> {{ towerEvent.location }}</p>
        </div>
    </RouterLink> -->
</template>


<style lang="scss" scoped>

</style>