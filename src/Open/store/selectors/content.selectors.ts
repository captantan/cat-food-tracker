import { State } from '../../../store/state';

const featureState = (state: State) => state.open.content;

export const content = featureState;
