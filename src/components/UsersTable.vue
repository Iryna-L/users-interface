<template>
  <div>
    <h1>Users</h1>
    <div v-show="!fetching">
      <div>
        <b-button id="show-btn" @click="$bvModal.show('bv-modal-create')" variant="outline-primary">Create new user</b-button>
      </div>
      <div  class="users-table">
        <div v-for="user in list" :key="user.id">
          <User :user="user" @edit="handleEditCurrentUser" />
        </div>
      </div>
      <create-modal />
      <edit-modal v-if="editableUser" :user="editableUser" />
    </div>
    <div v-show="fetching">
      <b-spinner variant="success" label="Spinning"></b-spinner>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import User from './User.vue'
import CreateModal from './CreateModal.vue'
import EditModal from './EditModal.vue'

export default {
  name: 'UsersTable',
  data () {
    return {
      editableUser: {}
    }
  },
  components: {
    User,
    CreateModal,
    EditModal
  },

  computed: {
   ...mapState('usersInfo', ['list', 'fetching'])
  },
  methods: {
    ...mapActions('usersInfo', ['getUsers']),

    handleEditCurrentUser (user) {
      this.editableUser = user
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>

<style scoped>
.users-table {
  display: grid;
  grid-gap: 30px;
  padding-top: 16px;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
