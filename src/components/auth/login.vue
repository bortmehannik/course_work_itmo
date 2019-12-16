<template lang="pug">
    .content-wrapper
        section
            .container
                .auth
                    .auth__banner
                        img(
                        src='../../assets/background-registration.png'
                        width='50%'
                        )
                    .auth__form
                        span.ui-title-2 Login
                        form(
                        @submit.prevent="onSubmit"
                        )
                            .form-item(
                            :class="{ 'errorInput': $v.email.$error }"
                            )
                                input(
                                type='email'
                                placeholder='email'
                                v-model='email'
                                :class="{ 'error': $v.email.$error }"
                                @change="$v.email.$touch()"
                                )
                                .error(v-if="!$v.email.required") Field is required
                                .error(v-if="!$v.email.email") Email is not correct
                            .form-item(
                            :class="{ 'errorInput': $v.password.$error }"
                            )
                                input(
                                type='password'
                                placeholder='password'
                                v-model='password'
                                :class="{ 'error': $v.password.$error }"
                                @change="$v.password.$touch()"
                                )
                                .error(v-if="!$v.password.required") Password is required.
                                .error(v-if="!$v.password.minLength")
                                    | Password must have at least {{ $v.password.$params.minLength.min }} letters.
                            .buttons-list
                                button.button.button-primary(
                                type="submit"
                                :disabled="submitStatus === 'PENDING'"
                                ) Login
                            .button-list.button-list--info
                                p.typo__p(v-if="submitStatus === 'OK'") Thanks for your submission!
                                p.typo__p(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
                                p.typo__p(v-else) {{ submitStatus }}
                                <!--p.typo__p(v-if="submitStatus === 'PENDING'") Sending...-->
                            .button-list.button-list--info
                                span Need registration?
                                    router-link(to="/registration")  Enter Here
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: '',
      password: '',
      submitStatus: null
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('loginUser', user)
          .then(() => {
            this.$router.push('/')
          })
          .catch(error => {
            this.submitStatus = error.message
          })
        // setTimeout(() => {
        //   this.submitStatus = 'OK'
        // }, 1000)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
a
    color dodgerblue
.auth
    display flex
    justify-content space-between
.form-item
    .error
        display none
    &.errorInput
        .error
            display block
            color red
            margin-bottom 5px
            font-size 12px
input
    &.error
        border-color red
        animation shake .1s
.auth__form
    width 50%
.auth__banner
    text-align center
.buttons-list
    text-align right
&.button-list--info
    text-align center
    font-size 15px
    margin-bottom 10px
    &:last-child
        margin-bottom 0
</style>
