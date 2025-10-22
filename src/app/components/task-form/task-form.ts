import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, OnInit, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  @Input() taskData: any;
  @Output() close = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();

  // @Output() save = new EventEmitter<Task>();

  http = inject(HttpClient);

  taskObj: any = {
    title: '',
    description: '',
    id: null,
  };

  tasksList: any[] = [];

  ngOnInit(): void {
    if (this.taskData) {
      this.taskObj = { ...this.taskData };
    }
  }

  getTasks() {
    this.http.get('http://127.0.0.1:8000/tasks/').subscribe((res: any) => {
      this.tasksList = res;
    });
  }

  addTask() {
    // debugger;
    this.http.post('http://127.0.0.1:8000/tasks/', this.taskObj).subscribe({
      next: (res) => {
        // debugger;
        this.refresh.emit();
        alert('Task added');
      },
      error: (error) => {
        // debugger;
        alert('Error -' + error);
      },
    });
  }

  updateTask() {
    this.http.put('http://127.0.0.1:8000/tasks/' + this.taskObj.id, this.taskObj).subscribe({
      next: (res) => {
        alert('Task Updated');
        this.refresh.emit();
        this.cancel();
      },
      error: (error) => {
        alert('Error - ' + error);
      },
    });
  }

  cancel() {
    this.close.emit();
  }
}
