import { GetUserNameByIdPipe } from './get-user-name-by-id.pipe';
import { AngularFirestore } from '@angular/fire/compat/firestore';


describe('GetUserNameByIdPipe', () => {
  let firestore: AngularFirestore
  it('create an instance', () => {
    const pipe = new GetUserNameByIdPipe(firestore);
    expect(pipe).toBeTruthy();
  });
});

