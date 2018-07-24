import React from 'react'; // for JSX
import { shallow } from 'enzyme'; // how to mount the component
import toJson from 'enzyme-to-json';
import NewMemeForm from '.'; // import the component itself

describe('<NewMemeForm />', () => {
  let wrapper;
  it('renders', () => {
    // smoke test!!!
    wrapper = shallow(<NewMemeForm addMeme={jest.fn()} />);
  });
  it('matches snapshot', () => {
    //snapshot test
    const serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
  });
});
