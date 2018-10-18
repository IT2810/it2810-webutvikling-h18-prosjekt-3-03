class TodoModel {
    constructor(title, completed, createdAt = new Date()) {
        this.title = title;
        this.completed = completed || false;
        this.createdAt = createdAt;
    }
}

module.exports = TodoModel;
