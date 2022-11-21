import { AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { BehaviorSubject } from "rxjs";
import { UserSearchResult } from "../components/share-dialog/share-dialog.component";

export const getUserObservable = (collection: AngularFirestoreCollection<UserSearchResult>) => {
  let subject : UserSearchResult[];
  collection.valueChanges({idField: 'id'}).subscribe((val: UserSearchResult[]) => {

  })

}
