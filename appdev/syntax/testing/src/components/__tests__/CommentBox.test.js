import React from 'react';
import { mount } from 'enzyme';
import CommentBox from 'components/CommentBox';
import Root from 'Root';

let commentBoxComponent;

beforeEach(() => {
  commentBoxComponent = mount(
    <Root>
      <CommentBox />
    </Root>
  );
});

afterEach(() => {
  commentBoxComponent.unmount();
});

it('has a text area and a button', () => {
  expect(commentBoxComponent.find('textarea').length).toEqual(1);
  expect(commentBoxComponent.find('button').length).toEqual(2);
});

describe('the textarea', () => {

  beforeEach(() => {
    commentBoxComponent.find('textarea').simulate('change', {
      target: { value: 'new comment' }
    });
    commentBoxComponent.update();
  });

  it('has a text area that users type in', () => {
    expect(commentBoxComponent.find('textarea').prop('value')).toEqual('new comment');
  });

  it('has a submit button that clears textarea when clicked', () => {
    expect(commentBoxComponent.find('textarea').prop('value')).toEqual('new comment');
    commentBoxComponent.find('form').simulate('submit');
    commentBoxComponent.update();
    expect(commentBoxComponent.find('textarea').prop('value')).toEqual('');
  });

});
