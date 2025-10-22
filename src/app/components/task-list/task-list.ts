import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { TaskForm } from '../task-form/task-form';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-task-list',
  imports: [TaskForm, NgIf],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  http = inject(HttpClient);

  tasksList: any[] = [];

  taskObj: any = {
    title: '',
    description: '',
  };

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.http.get('http://127.0.0.1:8000/tasks/').subscribe((res: any) => {
      this.tasksList = res;
    });
  }

  deleteTask(id: number) {
    // debugger;
    this.http.delete('http://127.0.0.1:8000/tasks/' + id, this.taskObj).subscribe({
      next: (res) => {
        // debugger;
        alert('Task deleted');
        this.getTasks();
      },
      error: (error) => {
        // debugger;
        alert('Error -' + error);
      },
    });
  }

  markComplete(id: number){
    // debugger
    this.http.patch(`http://127.0.0.1:8000/tasks/${id}/toggle/`, {}).subscribe({
      next:(res) =>{
        // debugger
        this.getTasks();
      },
      error: (error) => {
        alert('Error updating task')
      }
    })
  }

  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onEdit(item: any) {
    this.openModal();
    this.taskObj = item;
  }
}
