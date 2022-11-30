import { FlatTreeControl } from '@angular/cdk/tree';
import {
  Component,
  HostListener,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { Store } from '@ngrx/store';
import { start } from '@popperjs/core';
import { BehaviorSubject, Observable, share, Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/user/user.injectable';
import { User } from 'src/app/core/services/user/user.model';
import { getCurrentUser } from 'src/app/core/store/action/user.action';
import { setCurrentWorkspace } from 'src/app/core/store/action/workspace.action';
import { AppState } from 'src/app/core/store/state';
import { Workspace } from '../../models/workspace.model';
import { AddWorkspaceDialogComponent } from '../add-workspace-dialog/add-workspace-dialog.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  // styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  workspaces: Workspace[] = [];
  panelOpenState: boolean = false;
  user!: User;
  workspaceName!: string;
  appData!: AppState;

  constructor(
    private db: AngularFirestore,
    private dialog: MatDialog,
    public authService: AuthService,
    private store: Store<{ currentUser: User; currentWorkspaceId: string }>
  ) {
    this.db
      .collection<Workspace>('workspace')
      .valueChanges()
      .subscribe((val) => {
        const uid = (JSON.parse(localStorage.getItem('user') ?? '{}') as User)
          .uid;
        this.workspaces = val.filter(
          (val) =>
            val.owner === uid ||
            val.editor?.includes(uid ?? '') ||
            val.viewer?.includes(uid ?? '')
        );
        if(this.workspaces.length > 0) [
          this.store.dispatch(setCurrentWorkspace({currentWorkspaceId: this.workspaces[0].id ?? ''}))
        ]
        localStorage.setItem('workspace', JSON.stringify(this.workspaces));
      });

    this.store.select('currentUser').subscribe((val) => {
      this.user = val;
      console.log(val)
    });

    this.store
      .select('currentWorkspaceId')
      .subscribe((val) => {
        (this.workspaceName = val)
      });
  }

  ngOnInit(): void {
  }

  addWorkspace(): void {
    const dialogRef = this.dialog.open(AddWorkspaceDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  setCurrentWorkspace(workspace: Workspace): void {
    // localStorage.setItem('currentWorkspace', workspace.id ?? '');
    this.store.dispatch(setCurrentWorkspace({currentWorkspaceId: workspace.id ?? ''}))
  }
}
