package com.pebblepost.todo;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javassist.NotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@RestController()
@RequestMapping("/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TodoDto create(@RequestBody TodoDto createDto) {
        Todo todo = TodoDto.toEntity(createDto);
        Todo createdTodo = todoService.createTodo(todo);
        return TodoDto.fromEntity(createdTodo);
    }

    @GetMapping
    public List<TodoDto> getAll() {
        List<Todo> todos = todoService.getTodos();
        return todos.stream().map(TodoDto::fromEntity).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public TodoDto getOne(@PathVariable("id") Long id) throws NotFoundException {
        Todo todo = todoService.getTodo(id);
        return TodoDto.fromEntity(todo);
    }

    @PutMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public TodoDto put(@PathVariable("id") Long id, @RequestBody TodoDto updated) throws NotFoundException {
        Todo updatedTodo = TodoDto.toEntity(updated);
        Todo todo = todoService.updateTodo(id, updatedTodo);
        return TodoDto.fromEntity(todo);
    }

    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable("id") Long id) {
        todoService.deleteTodo(id);
    }

}
