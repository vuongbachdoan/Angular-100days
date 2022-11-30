import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Workspace } from '../../models/workspace.model';

@Component({
  selector: 'app-add-workspace-dialog',
  templateUrl: './add-workspace-dialog.component.html',
})
export class AddWorkspaceDialogComponent implements OnInit {
  workspaceName?: string

  constructor(private db: AngularFirestore, private store: Store<{}>) {
  }

  ngOnInit(): void {
  }

  createWorkspace() {
    let workSpace: Workspace = {
      name: this.workspaceName ?? "Default name",
      owner: JSON.parse(localStorage.getItem('user') ?? '{}').uid
    };
    this.db.collection('workspace').add(workSpace)
      .then(
        val => {
          this.db.collection('workspace').doc<Workspace | undefined>(val.id).update({
            id: val.id
          })
        }
      )
  }

}
