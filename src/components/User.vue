<template>
  <div class="user">
    <b-card :title="user.name" :sub-title="user.username">
    <b-card-text>
      <div v-if="user.phone"><span class="gray-title">phone:</span> {{ user.phone }}</div>
      <div><span class="gray-title">email:</span> {{ user.email }}</div>
      <div v-if="user.website"><span class="gray-title">website:</span> {{ user.website }}</div>
      <div v-if="user.address"><span class="gray-title">address:</span> {{ `${user.address.city}, ${user.address.street}, ${user.address.suite}` }}</div>
      <div v-if="user.company"><span class="gray-title">company:</span> {{ user.company.name }}</div>
    </b-card-text>

    <b-button @click="handleShowEditModal" variant="outline-primary">Edit</b-button>
    <b-button :id="user.id+'delete'" @click="handleDeleteUser">Delete</b-button>
  </b-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'UserItem',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions('usersInfo', ['deleteUser']),

    handleDeleteUser () {
      const response = this.deleteUser(this.user.id)

      if (response) {
        this.$bvToast.toast(`User ${this.user.name} is deleted`, {
          title: 'BootstrapVue Toast',
          autoHideDelay: 5000,
          appendToast: true
        })
      } else {
        this.$bvToast.toast(`Failure in deleting`, {
          title: "Failure",
          autoHideDelay: 1000,
          appendToast: true
        });
      }
    },
    handleShowEditModal () {
      this.$bvModal.show('bv-modal-edit')
      this.$emit('edit', this.user)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user {
  border-radius: 8px;
}
.gray-title {
  color: #8a8a8a
}
</style>
