import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task | null = null;
  @Output() edit = new EventEmitter<Task>();

  constructor() { }

  ngOnInit(): void {
  }

}
