import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserSharingData } from '../../models/data-user-share.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionGroup } from '@angular/fire/firestore';
import { CdkVirtualScrollableWindow } from '@angular/cdk/scrolling';
import { Workspace } from '../../models/workspace.model';
import { Store } from '@ngrx/store';

export interface UserSearchResult {
  id?: string;
  name: string;
  avatar: string;
}

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  // styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent implements OnInit {
  userSearchResult?: UserSearchResult;
  selectedRole?: string;
  workspace?: Workspace;
  userId!: string;
  currentWorkspaceId!: string;

  private backupSearchData: Partial<UserSharingData> = { ...this.data };

  constructor(
    public dialogRef: MatDialogRef<ShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserSharingData,
    private db: AngularFirestore,
    store: Store<{currentWorkspaceId: string}>
  ) {
    store.select('currentWorkspaceId').subscribe(
      (val) => {
        console.log(val)
        this.currentWorkspaceId = val
      }
    );

    console.log(this.currentWorkspaceId)
  }

  ngOnInit(): void {}

  cancel(): void {
    this.data.id = this.backupSearchData.id ?? '';
    this.dialogRef.close(this.data);
  }
  invite(): void {
    this.db
      .collection('workspace')
      .doc<Workspace>(this.currentWorkspaceId ?? '')
      .get()
      .subscribe((val) => {
        val.ref.update({
          editor:
            this.selectedRole === 'editor'
              ? [...(val.data()!.editor ?? []), this.userId]
              : (val.data()!.editor ?? []),
          viewer:
            this.selectedRole === 'viewer'
              ? [...(val.data()!.editor ?? []), this.userId]
              : (val.data()!.viewer ?? []),
          owner:
            this.selectedRole === 'owner'
              ? [...(val.data()!.editor ?? []), this.userId]
              : (val.data()!.owner ?? []),
        });
      });
  }
}
