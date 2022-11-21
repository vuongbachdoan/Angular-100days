import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWorkspaceDialogComponent } from './add-workspace-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddWorkspaceDialogComponent],
  imports: [CommonModule, FormsModule, MatDialogModule, MatTabsModule, MatButtonModule, MatFormFieldModule, MatInputModule ],
  exports: [AddWorkspaceDialogComponent],
})
export class AddWorkspaceDialogModule {}
