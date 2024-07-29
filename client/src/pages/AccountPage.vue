<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { ticketsService } from '../services/TicketsService.js';
import TowerEventDetails from '../components/TowerEventDetails.vue';

const account = computed(() => AppState.account)

const accountEvents = computed(() => AppState.accountEvents)

onMounted(() => getAccountTicketsForEvents())

// TODO get your events you have tickets for when this page mounts, reference getAlbumMemberAlbums from posit

async function deleteTicket(ticketId){
  try {
    const wantsToDelete = await Pop.confirm("Are you sure that you no longer what this ticket?")
    if(!wantsToDelete) return
    await ticketsService.deleteTicket(ticketId)
  } catch (error) {
    Pop.error(error)
  }
}


async function getAccountTicketsForEvents() {
  try {
    await ticketsService.getAccountTicketsForEvents()
  } catch (error) {
    Pop.error(error)
  }
}

</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
      <section class="container">
        <div class="row">
          <div v-for="accountEvent in accountEvents" :key="accountEvent.id" class="col-md-3 col-12">
            <!-- {{accountEvent.towerEvent.name }} -->
            <TowerEventDetails :towerEvent="accountEvent.towerEvent"/>
            <button @click="deleteTicket(accountEvent.id)" class="btn btn-danger mb-3"><i class="mdi mdi-delete"></i></button>
          </div>
        </div>
      </section>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
