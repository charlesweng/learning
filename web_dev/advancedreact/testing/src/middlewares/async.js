export default ({ dispatch }) => next => action => {
    // check to see if the action has a promise
    // on it's payload property
    // If it does, then wait for it to resolve
    // If it doesn't, then send the action to the
    // next middleware
    // debugger;
    if (!action.payload || !action.payload.then) {
        return next(action)
    }

    // we want to wait for action to resolve
    // (get this data)!! and then create a new action
    // with that data and dispatch it!
    action.payload.then(function(response) {
        const newAction = { ...action, payload: response };
        dispatch(newAction)
    });
}

