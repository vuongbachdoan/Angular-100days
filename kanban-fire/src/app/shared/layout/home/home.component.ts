import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShareDialogComponent } from '../../components/share-dialog/share-dialog.component';
import { TaskDialogComponent } from '../../components/task-dialog/task-dialog.component';
import { UserSharingData } from '../../models/data-user-share.model';
import { TaskDialogResult } from '../../models/task-dialog.model';
import { Task } from '../../models/task.model';
import { Workspace } from '../../models/workspace.model';

const getObservable = (collection: AngularFirestoreCollection<Task>) => {
  const subject = new BehaviorSubject<Task[]>([]);
  collection.valueChanges({ idField: 'todo' }).subscribe((val: Task[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  title = 'kanban-fire';
  todo = getObservable(
    this.db
      .collection('workspace')
      .doc(localStorage.getItem('workspace') ?? '')
      .collection('todo')
  ) as Observable<Task[]>;
  inProgress = getObservable(
    this.db
      .collection('workspace')
      .doc(localStorage.getItem('workspace') ?? '')
      .collection('inProgress')
  ) as Observable<Task[]>;
  done = getObservable(
    this.db
      .collection('workspace')
      .doc(localStorage.getItem('workspace') ?? '')
      .collection('done')
  ) as Observable<Task[]>;

  constructor(private dialog: MatDialog, private db: AngularFirestore) {
    this.db
      .collection('workspace')
      .doc(localStorage.getItem('workspace') ?? '')
      .collection('todo')
      .valueChanges()
      .subscribe((val) => {
        this.todo = getObservable(
          this.db
            .collection('workspace')
            .doc(localStorage.getItem('workspace') ?? '')
            .collection('todo')
        ) as Observable<Task[]>;
      });
  }
  ngOnInit(): void {
  }

  newPartner(): void {
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: UserSharingData | undefined) => {
      if (result) return;
    });
  }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe(async (result: TaskDialogResult | undefined) => {
        if (!result) {
          return;
        }
        this.db
          .collection('workspace')
          .doc(localStorage.getItem('workspace') ?? '')
          .collection('todo')
          .add(result.task)
      });
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult | undefined) => {
        if (!result) {
          return;
        }
        if (result.delete) {
          this.db
            .collection<Workspace>('workspace')
            .doc(localStorage.getItem('workspace') ?? '')
            .collection(list)
            .doc(task.id)
            .delete();
        } else {
          this.db
            .collection<Workspace>('workspace')
            .doc(localStorage.getItem('workspace') ?? '')
            .collection(list)
            .doc(task.id)
            .update(task);
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
        this.db
          .collection<Workspace>('workspace')
          .doc(localStorage.getItem('workspace') ?? '')
          .collection(event.previousContainer.id)
          .doc(item.id)
          .delete(),
        this.db
          .collection<Workspace>('workspace')
          .doc(localStorage.getItem('workspace') ?? '')
          .collection(event.container.id)
          .add(item),
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
