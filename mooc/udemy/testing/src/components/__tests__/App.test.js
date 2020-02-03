import React from 'react';
import { shallow } from 'enzyme';
import App from 'components/App';
import CommentBox from 'components/CommentBox';
import CommentList from 'components/CommentList';

// jest
// it ( test description, function containing test logic)
// expect ( actual value ) . matcher ( expected value )
// before ( function )

// enzyme
// static, shallow, full dom

let appComponent;

beforeEach(() => {
   appComponent = shallow(<App />);
});

it('shows a comment box', () => {
  expect(appComponent.find(CommentBox).length).toEqual(1);
});

it('shows a comment list', () => {
  expect(appComponent.find(CommentList).length).toEqual(1);
})
