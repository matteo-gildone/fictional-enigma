import "jest-dom/extend-expect";
import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

import { InputTextComponent } from "../InputTextComponent";

test("Should print the html for an input field", () => {
  const fakeHandleChange = jest.fn();
  const wrapper = shallow(
    <InputTextComponent
      label="Title"
      id="title"
      value="My title"
      handleChange={fakeHandleChange}
    />
  );
  expect(wrapper.find("label").text()).toEqual("Title");
  wrapper.find("input").simulate("change", { target: { value: "Hello" } });
  expect(fakeHandleChange).toBeCalled();
  expect([...wrapper.find("small")].length).toEqual(0);
});

test("Should print the html for helpText field", () => {
  const fakeHandleChange = jest.fn();
  const wrapper = shallow(
    <InputTextComponent
      label="Title"
      id="title"
      value="My title"
      handleChange={fakeHandleChange}
      helpText="Insert your options comma separated, eg 'News, Research Analysis, Book & Culture'"
    />
  );
  expect(wrapper.find("small").text()).toEqual(
    "Insert your options comma separated, eg 'News, Research Analysis, Book & Culture'"
  );
});
