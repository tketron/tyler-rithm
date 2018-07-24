import React from 'react'; // for JSX
import { shallow } from 'enzyme'; // how to mount the component
import toJson from 'enzyme-to-json';
import Meme from '.'; // import the component itself

describe('<Meme />', () => {
  let wrapper;
  it('renders', () => {
    // smoke test!!!
    wrapper = shallow(
      <Meme
        url="https://i.ytimg.com/vi/I7jgu-8scIA/maxresdefault.jpg"
        topText="I can haz"
        bottomText="react tests"
      />
    );
  });
  it('matches snapshot', () => {
    //snapshot test
    const serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
  });
});
