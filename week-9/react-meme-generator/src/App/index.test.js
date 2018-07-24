import React from 'react'; // for JSX
import { shallow } from 'enzyme'; // how to mount the component
import toJson from 'enzyme-to-json';
import App from '.'; // import the component itself

describe('<App />', () => {
  let wrapper;
  it('renders', () => {
    // smoke test!!!
    wrapper = shallow(<App />);
  });
  it('matches snapshot', () => {
    //snapshot test
    const serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
  });
});
