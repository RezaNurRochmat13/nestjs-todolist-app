import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  create(todo: Todo): Promise<Todo> {
    return this.todoRepository.save(todo);
  }

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  findOne(id: number): Promise<Todo | null> {
    return this.todoRepository.findOneBy({ id });
  }

  update(id: number, todo: Todo): Promise<Todo> {
    const todoFindById = this.todoRepository.findOneBy({ id });

    if (todoFindById) {
      this.todoRepository.update(id, todo);
    }

    return todoFindById;
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
