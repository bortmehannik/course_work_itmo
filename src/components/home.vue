<template lang="pug">
.content-wrapper
    section
        .container
            h1.ui-title-1 Home
            input(
            type="text"
            placeholder="What we will watch?"
            v-model="taskTitle"
            @keyup.enter="newTask"
            )
            textarea(
            placeholder="Write your description"
            v-model="taskDescription"
            @keyup.enter="newTask"
            )
            .option-list
                input.what-watch(
                    type="radio"
                    id="radioFilm"
                    value="Film"
                    v-model="whatWatch"
                )
                label(
                    for="radioFilm"
                ) Film
                input.what-watch(
                    type="radio"
                    id="radioSerial"
                    value="Serial"
                    v-model="whatWatch"
                )
                label(
                    for="radioSerial"
                ) Serial
            .total-time
                .total-time__film(
                    v-if="whatWatch === 'Film'"
                )
                   span.time-title Hours
                   input.time-input(
                    type="number"
                    v-model="filmHours"
                   )
                   span.time-title Minutes
                   input.time-input(
                   type="number"
                   v-model="filmMinutes"
                   )
                   p {{ filmTime }}
                .total-time__serial(
                    v-if="whatWatch === 'Serial'"
                )
                    span.time-title How many season?
                    input.time-input(
                    type="number"
                    v-model="serialSeasons"
                    )
                    span.time-title How many series?
                    input.time-input(
                    type="number"
                    v-model="serialSeries"
                    )
                    span.time-title How long is one series? (minutes)
                    input.time-input(
                    type="number"
                    v-model="serialMinutes"
                    )
                    p {{ serialTime }}
            .add-tag
                .ui-tag__wrapper
                    .ui-tag(
                        @click="addNewTag = !addNewTag"
                    )
                        span.tag-title Add New
            form.new-tag(
                v-if="addNewTag"
            )
                input(
                    type="text"
                    placeholder="Tag Name"
                    v-model="newTag"
                    @keyup.enter="addedNewTag"
                )
                a.button.button-primary(
                    @click="addedNewTag"
                ) Add
            .tag-list
                transition-group(
                    enter-active-class="animated fadeInRight"
                    leave-active-class="animated fadeOutDown"
                )
                    .ui-tag__wrapper(
                        v-for="tag in tags"
                        :key="tag.title"
                    )
                        .ui-tag(
                            @click="addTagUsed(tag)"
                            :class="{active: tag.use}"
                        )
                            span.tag-title {{ tag.title }}
                            span.button-close
        a.button.button-primary.send-btn(
            @click="newTask"
        ) Send
</template>

<script>
export default {
  data () {
    return {
      taskId: 3,
      taskTitle: '',
      taskDescription: '',
      whatWatch: '',
      filmHours: '',
      filmMinutes: '',
      serialSeasons: '',
      serialSeries: '',
      serialMinutes: '',

      // Tags
      addNewTag: false,
      newTag: '',
      tagsUsed: []
    }
  },
  methods: {
    newTask () {
      if (this.taskTitle === '') {
        return
      }
      let time
      if (this.whatWatch === 'Film') {
        time = this.filmTime
      } else {
        time = this.serialTime
      }
      const tasks = {
        title: this.taskTitle,
        description: this.taskDescription,
        whatWatch: this.whatWatch,
        time,
        tags: this.tagsUsed,
        completed: false,
        editing: false
      }
      this.$store.dispatch('newTask', tasks)

      // Reset
      this.taskTitle = ''
      this.taskDescription = ''
      this.tagsUsed = ''

      for (let i = 0; i < this.tags.length; i++) {
        this.tags[i].use = false
      }
    },
    getHoursAndMinutes (minutes) {
      let hours = Math.trunc(minutes / 60)
      let min = minutes % 60
      return hours + ' Hours ' + min + ' Minutes'
    },
    addTagUsed (tag) {
      tag.use = !tag.use
      if (tag.use) {
        this.tagsUsed.push({
          title: tag.title
        })
      } else {
        this.tagsUsed.splice(tag.title, 1)
      }
    },
    addedNewTag () {
      if (this.newTag === '') {
        return
      }
      const tag = {
        title: this.newTag,
        use: false
      }
      this.$store.dispatch('newTag', tag)
    }
  },
  computed: {
    tags () {
      return this.$store.getters.tags
    },
    filmTime () {
      let min = (this.filmHours * 60) + this.filmMinutes * 1
      return this.getHoursAndMinutes(min)
    },
    serialTime () {
      let min = this.serialSeasons * this.serialSeries * this.serialMinutes
      return this.getHoursAndMinutes(min)
    }
  }
}
</script>

<style lang="stylus" scoped>
.option-list
    display flex
    align-items center
    input
        margin-bottom 0
        &:last-of-type
            margin-left 20px
    label
        margin-bottom 0
        margin-left 10px
.total-time
    input
        width 50px
    div
        display flex
        flex-direction column
.ui-tag__wrapper
    margin-right 10px
    .ui-tag.active
        background blue
        color #ffffff
        .button-close:before, .button-close:after
            background #ffffff
.add-tag
    margin 10px 0
    cursor pointer
.new-tag
    display flex
    align-items center
    margin-bottom 30px
    input
        margin 0
        border-radius 0
        margin-right 100px
a.send-btn
    float right
</style>
