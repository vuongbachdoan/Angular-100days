// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { map, mergeMap } from 'rxjs/operators';
// import { WorkspaceService } from '../../services/workspace/workspace.service';

// @Injectable()
// export class WorkspaceEffect {
//   setCurrentWorkspace$ = createEffect(() =>
//     this.action$.pipe(
//       ofType('[WORKSPACE] GET CURRENT WORKSPACE'),
//       mergeMap(() => this.workspaceService.setCurrentWorkspace('temp')
//       .pipe(
//         map(workspace => ({type: '[WORKSPACE] GET CURRENT WORKSPACE', payload: workspace}))
//         )
//       )
//     )
//   );

//   constructor(
//     private action$: Actions,
//     private workspaceService: WorkspaceService
//   ) {}
// }
