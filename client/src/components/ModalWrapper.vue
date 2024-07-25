<script setup>

</script>


<template>
<div class="modal fade" id="eventFormModal" tabindex="-1" role="dialog" aria-labelledby="eventFormModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="eventFormModal">Create an event</h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <slot>
            <!-- Form will go in here -->
        </slot>
      </div>
    </div>
  </div>
</div>
</template>


<style lang="scss" scoped>

</style>