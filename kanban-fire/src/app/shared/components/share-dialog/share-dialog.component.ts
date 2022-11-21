import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserSharingData } from '../../models/data-user-share.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionGroup } from '@angular/fire/firestore';
import { CdkVirtualScrollableWindow } from '@angular/cdk/scrolling';
import { Workspace } from '../../models/workspace.model';

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

  private backupSearchData: Partial<UserSharingData> = { ...this.data };

  constructor(
    public dialogRef: MatDialogRef<ShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserSharingData,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {}

  cancel(): void {
    this.data.id = this.backupSearchData.id ?? '';
    this.dialogRef.close(this.data);
  }
  invite(): void {
    this.db
      .collection('workspace')
      .doc<Workspace>(localStorage.getItem('workspace') ?? '')
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
        this.db
          .collection<Workspace>('workspace')
          .doc(localStorage.getItem('workspace') ?? '')
          .get()
          .subscribe((data) => {
            console.log(data.data())

          });
      });
  }
}
