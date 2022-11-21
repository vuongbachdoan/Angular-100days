import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, HostListener, OnInit, SimpleChange} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Observable } from '@firebase/util';
import { BehaviorSubject,  } from 'rxjs';
import { AuthService } from 'src/app/core/services/user/user.injectable';
import { User } from 'src/app/core/services/user/user.model';
import { Workspace } from '../../models/workspace.model';
import { AddWorkspaceDialogComponent } from '../add-workspace-dialog/add-workspace-dialog.component';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/**
 * @title Tree with flat nodes
 */
 @Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  // styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  workspaceName?: string;
  workspaces: Workspace[] = []
  panelOpenState: boolean = false;
  user!: User;
  currentWorkspace!: String;

  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private db: AngularFirestore,
    private dialog: MatDialog,
    public authService: AuthService
  ) {
    this.dataSource.data = TREE_DATA;
    this.db.collection<Workspace>('workspace').valueChanges()
      .subscribe(val => {
        const uid = JSON.parse(localStorage.getItem('user') ?? '{}').uid
        this.workspaces = val.filter(val => val.owner === uid || val.editor?.includes(uid ?? '') || val.viewer?.includes(uid ?? ''))
        localStorage.setItem('currentWorspace', JSON.stringify(this.workspaces))
      })

    this.user = JSON.parse(localStorage.getItem('user')!)
  }

  @HostListener('window:storage')
  onStorageChange() {
    this.user = JSON.parse(localStorage.getItem('user')!)
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!)
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  addWorkspace(): void {
    const dialogRef = this.dialog.open(AddWorkspaceDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  setCurrentWorkspace(workspace: Workspace): void {
    localStorage.setItem('workspace', workspace.id ?? '')
  }
}
