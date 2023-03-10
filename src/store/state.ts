import { EditState } from '../Edit/store/state';
import { OpenState } from '../Open/store/state';

export interface State {
  edit: EditState;
  open: OpenState;
}
