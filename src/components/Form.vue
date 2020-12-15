<template>
  <div class="d-block text-center">
    <b-form-group
      id="name"
      label="Enter your name"
      label-for="input-name"
      :invalid-feedback="nameError"
      :state="nameError.length === 0"
    >
      <b-form-input
        id="input-name"
        v-model="name"
        :state="nameError.length === 0"
        trim
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="email"
      label="Enter your email"
      label-for="input-email"
      :invalid-feedback="emailError"
      :state="emailError.length === 0"
    >
      <b-form-input
        id="input-email"
        v-model="email"
        :state="emailError.length === 0"
        trim
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="username"
      label="Enter your username"
      label-for="input-username"
      :invalid-feedback="userNameError"
      :state="userNameError.length === 0"
    >
      <b-form-input
        id="input-username"
        v-model="username"
        :state="userNameError.length === 0"
        trim
      ></b-form-input>
    </b-form-group>
    <b-button class="mt-1" @click="handleSubmit">{{ btnText }}</b-button>
  </div>
</template>

<script>
import {
  maxLength,
  required,
  minLength,
  email
} from "vuelidate/lib/validators";

export default {
  data () {
    return {
      name: "",
      email: "",
      username: ""
    };
  },
  props: {
    btnText: {
      type: String,
      default: 'Create'
    },
    userEditable: {
      type: Object,
      default: () => null
    }
  },
  mounted () {
    if (this.userEditable) {
      this.name = this.userEditable.name
      this.username = this.userEditable.username
      this.email = this.userEditable.email
    }
  },
  methods: {
    handleSubmit () {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return
      }

      const payload = {
        username: this.username,
        name: this.name,
        email: this.email
      }

      this.$emit('submitForm', payload)
    }
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
      } else {
        return "";
      }
    },
    userNameError () {
      if (!this.$v.username.maxLength && this.$v.username.$error) {
        return "username max length - 30 symbols";
      } else if (!this.$v.username.required && this.$v.username.$error) {
        return "username is required";
      } else {
        return "";
      }
    },
    emailError () {
      if (!this.$v.email.maxLength && this.$v.email.$error) {
        return "username max length - 250 symbols";
      } else if (!this.$v.email.email && this.$v.email.$error) {
        return "email format is : aaa@aa.aa";
      } else if (!this.$v.email.required && this.$v.email.$error) {
        return "email is required";
      } else {
        return "";
      }
    }
  }
};
</script>
