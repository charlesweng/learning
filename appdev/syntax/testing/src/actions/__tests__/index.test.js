import { SAVE_COMMENT, FETCH_COMMENTS } from 'actions/types';
import { saveComment, fetchComments } from 'actions';

describe('Save Comment', () => {
  it('has the correct type', () => {
    const action = saveComment();
    expect(action.type).toEqual(SAVE_COMMENT);
  });

  it('has the correct payload', () => {
    const action = saveComment('new comment');
    expect(action.payload).toEqual('new comment');
  });
})

describe('Fetch Comments', () => {
})
