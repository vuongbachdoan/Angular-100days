import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavModule } from '../../components/sidenav/sidenav.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ShareDialogModule } from '../../components/share-dialog/share-dialog.module';
import { TaskModule } from '../../components/task/task.module';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { TaskDialogModule } from '../../components/task-dialog/task-dialog.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    SidenavModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    DragDropModule,
    MatCardModule,
    MatToolbarModule,
    ShareDialogModule,
    TaskDialogModule,
    AngularFirestoreModule,
    TaskModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
