export default class Task {
  constructor (title, description, whatWatch, completed, tags, editing, user = null, id = null) {
    this.title = title
    this.description = description
    this.whatWatch = whatWatch
    this.completed = completed
    this.tags = tags
    this.editing = editing
    this.user = user
    this.id = id
  }
}
