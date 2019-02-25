import "jest-dom/extend-expect";
import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

import { InputSwitchComponent } from "../InputSwitchComponent";

test("Should print the html for an input field", () => {
  const fakeHandleChange = jest.fn();
  const wrapper = shallow(
    <InputSwitchComponent
      label="Multiple choice"
      id="multiple-0"
      handleChange={fakeHandleChange}
    />
  );
  expect(wrapper.find("label").text()).toEqual("Multiple choice");
  wrapper.find("input").simulate("change", { target: { value: "Hello" } });
  expect(fakeHandleChange).toBeCalled();
});
