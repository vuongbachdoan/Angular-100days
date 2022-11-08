import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { MatCardModule } from '@angular/material/card';
import { TaskDialogModule } from '../task-dialog/task-dialog.module';

@NgModule({
  declarations: [TaskComponent],
  imports: [
    CommonModule,
    MatCardModule,
    TaskDialogModule,
  ],
  exports: [TaskComponent],
})
export class TaskModule {}
