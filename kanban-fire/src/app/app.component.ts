import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './shared/components/task-dialog/task-dialog.component';
import { Task } from './shared/models/task.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { TaskDialogResult } from './shared/models/task-dialog.model';
import { BehaviorSubject, Observable } from 'rxjs';

const getObservable = (collection: AngularFirestoreCollection<Task>) => {
  const subject = new BehaviorSubject<Task[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Task[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'kanban-fire';
  todo = getObservable(this.db.collection('todo')) as Observable<Task[]>;
  inProgress = getObservable(this.db.collection('inProgress')) as Observable<Task[]>;
  done = getObservable(this.db.collection('done')) as Observable<Task[]>;

  constructor(private dialog: MatDialog, private db: AngularFirestore) {}

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe(async (result: TaskDialogResult|undefined) => {
        if (!result) {
          return;
        }
        this.db.collection('todo').add(result.task)
      });
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult|undefined) => {
      if (!result) {
        return;
      }
      if (result.delete) {
        this.db.collection(list).doc(task.id).delete();
      } else {
        this.db.collection(list).doc(task.id).update(task);
      }
    });
  }

  drop(event: CdkDragDrop<Task[] | null>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.previousContainer.data || !event.container.data) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    this.db.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.db.collection(event.previousContainer.id).doc(item.id).delete(),
        this.db.collection(event.container.id).add(item),
      ]);
      return promise;
    });
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
