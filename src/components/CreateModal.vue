<template>
  <div>
    <b-modal id="bv-modal-create" hide-footer>
      <template #modal-title> Create new user </template>
      <Form @submitForm="submitCreate" />
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
  data () {
    return {
      name: "",
      email: "",
      username: ""
    };
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
  computed: {
    nameError () {
      if (!this.$v.name.maxLength && this.$v.username.$error) {
        return "Name max length - 250 symbols";
      } else if (!this.$v.name.minLength && this.$v.username.$error) {
        return "Name min length - 2 symbols";
      }
      return ""
    },
    userNameError () {
      if (!this.$v.username.maxLength && this.$v.username.$error) {
        return "username max length - 30 symbols";
      } else if (!this.$v.username.required && this.$v.username.$error) {
        return "username is required";
      }
      return ""
    },
    emailError () {
      if (!this.$v.email.maxLength && this.$v.email.$error) {
        return "username max length - 250 symbols";
      } else if (!this.$v.email.email && this.$v.email.$error) {
        return "email format is : aaa@aa.aa";
      } else if (!this.$v.email.required && this.$v.email.$error) {
        return "email is required";
      }
      return ""
    }
  },
  components: {
    Form
  },
  methods: {
    ...mapActions("usersInfo", ["createUser"]),
    submitCreate (payload) {
      const result = this.createUser(payload);

      if (result) {
        this.$bvToast.toast(`New user is successfully created`, {
          title: "Success",
          autoHideDelay: 1000,
          appendToast: true
        });

        this.handleCloseModal()
      } else {
        this.$bvToast.toast(`Failure in creating`, {
          title: "Failure",
          autoHideDelay: 1000,
          appendToast: true
        });
      }
    },
    handleCloseModal () {
      this.$bvModal.hide('bv-modal-create')
      this.name = ''
      this.email = ''
      this.username = ""
    }
  }
};
</script>
