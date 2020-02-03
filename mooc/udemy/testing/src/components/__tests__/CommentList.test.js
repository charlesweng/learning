import React from 'react';
import { mount } from 'enzyme';

import CommentList from 'components/CommentList';
import Root from 'Root';

let commentListComponent;

beforeEach(()=> {
  const initialState = {
    comments: ['Comment 1', 'Comment 2']
  }

  commentListComponent = mount(
    <Root initialState={initialState}>
      <CommentList />
    </Root>
  );
});

it('creates one LI per comment', () => {
  expect(commentListComponent.find('li').length).toEqual(2);
});

it('shows the text for each comment', () => {
  let text = commentListComponent.render().text();
  expect(text).toContain('Comment 1');
  expect(text).toContain('Comment 2');
});
