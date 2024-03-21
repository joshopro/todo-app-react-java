package com.pebblepost.todo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private boolean completed;

    // TODO: Create Model

    public Todo() {}

    // Constructor for creating a new Todo with title
    public Todo(String title) {
        this.title = title;
        this.completed = false; // default to not completed
    }

    // Constructor for creating a new Todo with id, title, and completed status
    public Todo(Long id, String title, boolean completed) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    // Builder static inner class for constructing Todo instances
    public static class Builder {

        private Long id;
        private String title;
        private boolean completed;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder title(String title) {
            this.title = title;
            return this;
        }

        public Builder completed(boolean completed) {
            this.completed = completed;
            return this;
        }

        public Todo build() {
            return new Todo(this.id, this.title, this.completed);
        }

    }

    // Static method to access the builder
    public static Builder builder() {
        return new Builder();
    }

}
