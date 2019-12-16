<template lang="pug">
    .content-wrapper
        table.ui-table
            thead
                tr
                    th
                        span Name
                    th
                        span Password
                    th
                        span Age
            tbody
                tr(
                    v-for="user in getUsers"
                )
                    td
                        span.ui-text-regular {{ user.email }}
                    td
                        span.ui-text-regular {{ user.password }}
                    td
                        span.ui-text-regular 26
        button.btn-default(
            @click="loadUsers"
        ) Get users
</template>

<script>
export default {
  methods: {
    loadUsers () {
      this.$store.dispatch('loadUsers')
    }
  },
  computed: {
    getUsers () {
      return this.$store.getters.getUser
    }
  }
}
</script>

<style lang="stylus" scoped>
button
    color blue
</style>
