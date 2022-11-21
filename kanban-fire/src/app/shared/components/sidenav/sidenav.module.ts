import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import { AddWorkspaceDialogModule } from '../add-workspace-dialog/add-workspace-dialog.module';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import {ClipboardModule} from '@angular/cdk/clipboard';

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTreeModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatInputModule,
    FormsModule,
    MatExpansionModule,
    AddWorkspaceDialogModule,
    MatListModule,
    RouterModule,
    MatChipsModule,
    MatMenuModule,
    ClipboardModule
  ],
  exports: [SidenavComponent],
})
export class SidenavModule {}
