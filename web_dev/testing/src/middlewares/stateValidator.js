import tv4 from 'tv4';
import stateSchema from './stateSchema';

export default ({ dispatch, getState }) => (next) => (action) => {
    next(action);

    let isValid = tv4.validate(getState(), stateSchema);
    if (!isValid) {
        console.warn('Invalid state schema detected.');
    }
}