package com.pebblepost.todo;

import javassist.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    Todo createTodo(Todo newTodo) {
        return todoRepository.save(newTodo);
    }

    public List<Todo> getTodos() {
        return todoRepository.findAll();
    }

    public Todo getTodo(Long id) throws NotFoundException {
        return todoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Todo not found with id: " + id));
    }

    public Todo updateTodo(Long id, Todo updatedTodo) throws NotFoundException {
        return todoRepository.findById(id)
                .map(todo -> {
                    todo.setTitle(updatedTodo.getTitle());
                    todo.setCompleted(updatedTodo.isCompleted());
                    return todoRepository.save(todo);
                }).orElseThrow(() -> new NotFoundException("Todo not found with id: " + id));
    }

    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }

}
