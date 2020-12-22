<template>
  <div>
    <b-modal id="bv-modal-edit" hide-footer>
      <template #modal-title> Edit user </template>
      <Form @submitForm="submitEdit" :userEditable="user" btnText="Edit"/>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  maxLength,
  required,
  minLength,
  email
} from "vuelidate/lib/validators";
import Form from './Form.vue'

export default {
  components: {
    Form
  },
  validations: {
    name: {
      maxLength: maxLength(250),
      minLength: minLength(2)
    },
    username: {
      maxLength: maxLength(30),
      required
    },
    email: {
      email,
      maxLength: maxLength(250),
      required
    }
  },
  data () {
    return {
      name: "",
      email: "",
      username: ""
    };
  },
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  created () {
    this.name = this.user.name
    this.email = this.user.email
    this.username = this.user.username
  },
  methods: {
    ...mapActions("usersInfo", ["editUser"]),
    submitEdit (payload) {
      const response = this.editUser({ id: this.user.id, payload });

      if (response) {
        this.$bvToast.toast(`New user is successfully edited`, {
          title: "Success",
          autoHideDelay: 1000,
          appendToast: true
        });

        this.handleCloseModal()
      } else {
        this.$bvToast.toast(`Failure in editing`, {
          title: "Failure",
          autoHideDelay: 1000,
          appendToast: true
        });
      }
    },
    handleCloseModal () {
      this.$bvModal.hide('bv-modal-edit')
      this.name = ''
      this.email = ''
      this.username = ""
    }
  }
};
</script>
