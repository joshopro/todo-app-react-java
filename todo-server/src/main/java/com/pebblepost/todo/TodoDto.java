package com.pebblepost.todo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL) // Only include non-null values in the JSON
public class TodoDto {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    private String title;
    private boolean completed;

    public TodoDto() {}

    // Constructor using fields
    public TodoDto(Long id, String title, Boolean completed) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }

    // Convert Entity to DTO
    public static TodoDto fromEntity(Todo todo) {
        return new TodoDto(
                todo.getId(),
                todo.getTitle(),
                todo.isCompleted()
        );
    }

    // Convert DTO to Entity
    public static Todo toEntity(TodoDto dto) {
        Todo todo = new Todo();
        todo.setId(dto.getId()); // Normally I wouldn't set the ID when creating a new Todo
        todo.setTitle(dto.getTitle());
        todo.setCompleted(dto.getCompleted() != null && dto.getCompleted()); // Handle null completed value
        return todo;
    }

    private static Builder builder() {
        return new Builder();
    }

    private static class Builder {

        public TodoDto build() {
            return new TodoDto();
        }

    }

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

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

}
