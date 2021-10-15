import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private _tasks: Task[] = [];

  public get tasks(): Task[] {
    return this._tasks;
  }

  getTaskById(id: string): Task | null {
    return this._tasks.find((task) => task.id === id) || null;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this._tasks.push(task);

    return task;
  }
  deleteTask(id: string): void {
    this._tasks = this._tasks.filter((task) => task.id !== id);
  }
  updateTaskStatus(id: string, status: TaskStatus): Task | null {
    const task = this.getTaskById(id);
    if (!task) return null;
    task.status = status;
    return task;
  }
}
