<template lang="pug">
    .content-wrapper
        section
            .container
                .task-list__header
                    h1.ui-title-1 Tasks
                    .button-list
                        .button.button--round.button-default(
                            @click="filter = 'active'"
                        ) Active
                        .button.button--round.button-default(
                        @click="filter = 'completed'"
                        ) Completed
                        .button.button--round.button-default(
                        @click="filter = 'all'"
                        ) All
                .task-list
                    .task-item(
                    v-for="task in tasksFilter"
                    :key="task.id"
                    :class="{ completed: task.completed }"
                    )
                        .ui-card.ui-card--shadow
                            .task-item__info
                                .task-item__main-info
                                    span.ui-label.ui-label--light {{ task.whatWatch }}
                                    span Total Time: {{ task.time }}
                                span.button-close(
                                    @click="deleteTask(task.id)"
                                )
                            .task-item__header
                                .ui-checkbox-wrapper
                                    input.ui-checkbox(
                                    type='checkbox'
                                    v-model="task.completed"
                                    )
                                span.ui-title-3 {{ task.title }}
                            .task-item__body
                                p.ui-text-regular {{ task.description }}
                            .task-item__footer
                                .tag-list
                                    .ui-tag__wrapper(
                                    v-for="tag in task.tags"
                                    :key="tag.title"
                                    )
                                        .ui-tag
                                            span.tag-title {{ tag.title }}
                                .buttons-group
                                    .button.button-default(
                                        @click="taskEdit(task.id, task.title, task.description)"
                                    ) Edit
                                    .button.button-primary Done

        .ui-messageBox__wrapper(
            :class="{ editing: editing }"
        )
            .ui-messageBox.fadeInDown
                .ui-messageBox__header
                    span.messageBox-title Title
                    span.button-close.ui-messageBox-close(
                        @click="editing = !editing"
                    )
                .ui-messageBox__content
                    label Title
                    input(
                        type='text'
                        v-model='titleEditing'
                    )
                    label Description
                    textarea(
                        rows="5"
                        v-model='descEditing'
                    )
                .ui-messageBox__footer
                    .button.button-light(
                        @click="cancelTaskEdit"
                    ) Cancel
                    .button.button-primary(
                        @click="finishTaskEdit"
                    ) OK
</template>

<script>
export default {
  data () {
    return {
      filter: 'active',
      editing: false,
      titleEditing: '',
      descEditing: '',
      taskId: null
    }
  },
  methods: {
    taskEdit (id, title, desc) {
      this.editing = !this.editing
      console.log({id, title, desc})
      this.taskId = id
      this.titleEditing = title
      this.descEditing = desc
    },
    cancelTaskEdit () {
      this.editing = !this.editing

      // Reset
      this.taskId = null
      this.titleEditing = ''
      this.descEditing = ''
    },
    finishTaskEdit () {
      this.$store.dispatch('editTask', {
        id: this.taskId,
        title: this.titleEditing,
        description: this.descEditing
      })
      this.editing = !this.editing
    },
    deleteTask (id) {
      this.$store.dispatch('deleteTask', id)
        .then(() => {
          console.log('task deleted')
          this.$store.dispatch('loadTasks')
        })
    }
  },
  computed: {
    tasksFilter () {
      if (this.filter === 'active') {
        return this.$store.getters.taskNotCompleted
      } else if (this.filter === 'completed') {
        return this.$store.getters.taskCompleted
      } else if (this.filter === 'all') {
        return this.$store.getters.tasks
      } else {
        return this.filter === 'active'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.ui-label
    margin-right 10px
.task-item
    margin-bottom 20px
    &:last-child
        margin-bottom: 0
.task-item__info
    display flex
    align-items center
    justify-content space-between
    margin-bottom 20px
    .button-close
        margin-bottom 20px
.task-item__header
    display flex
    align-items center
    margin-bottom 18px
    .ui-checkbox-wrapper
        margin-right 8px
    .ui-title-3
        margin-bottom 0
.task-item__body
    margin-bottom 30px
.task-list__header
    display flex
    align-items center
    justify-content space-between
    margin-bottom 20px
    h1
        margin-bottom 0
    .button-list
        > div
            margin-right 10px
.task-item
    &.completed
        .ui-title-3,
        .ui-checkbox-wrapper,
        .ui-tag
            text-decoration line-through
            filter grayscale(100%)
            color gray
    &__footer
        display flex
        justify-content space-between
.ui-messageBox__wrapper
    &.editing
        display flex
</style>
