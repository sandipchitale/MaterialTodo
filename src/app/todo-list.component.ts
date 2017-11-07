import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'mddemo-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  title = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  sansCompletedTodos(): Todo[] {
    return this.todos.filter(todo => !todo.completed);
  }

  zeroCompletedTodos(): boolean {
    if (this.todos) {
      return !this.todos.some(todo => todo.completed === true);
    }
    return false;
  }

  getTodos(): void {
    this.todoService
        .getTodos()
        .subscribe((todos) => {
          this.todos = todos;
        });
  }

  addTodo(): void {
    this.title = this.title.trim();
    if (!this.title) { return; }
    this.todoService.create(this.title)
      .subscribe(todo => {
        this.todos.push(todo);
        this.title = '';
      },
      this.handleError);
  }

  removeCompleted(): void {
    this.todos.slice().reverse().forEach(todo => {
      if (todo.completed) {
        this.removeTodo(todo);
      }
    });
  }

  removeTodo(todo: Todo): void {
    this.todoService
        .delete(todo.id)
        .subscribe(() => {
          this.todos = this.todos.filter(h => h !== todo);
        },
        this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
