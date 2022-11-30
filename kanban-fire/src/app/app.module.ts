import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeModule } from './shared/layout/home/home.module';
import { LoginModule } from './shared/layout/login/login.module';
import { AuthService } from './core/services/user/user.injectable';
import { StoreModule } from '@ngrx/store';
import { workspaceReducer } from './core/store/reducer/workspace.reducer';
import { userReducer } from './core/store/reducer/user.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule,
    HomeModule,
    LoginModule,
    StoreModule.forRoot({currentWorkspaceId: workspaceReducer, currentUser: userReducer})
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
