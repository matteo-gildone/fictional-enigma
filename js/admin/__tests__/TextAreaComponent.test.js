import "jest-dom/extend-expect";
import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

import { TextAreaComponent } from "../TextAreaComponent";

test("Should print the html for an textarea field", () => {
  const fakeHandleChange = jest.fn();
  const wrapper = shallow(
    <TextAreaComponent
      label="Title"
      id="title"
      value="My title"
      handleChange={fakeHandleChange}
    />
  );
  expect(wrapper.find("label").text()).toEqual("Title");
  wrapper.find("textarea").simulate("change", { target: { value: "Hello" } });
  expect(fakeHandleChange).toBeCalled();
});

test("Should print the html for an textarea field", () => {
  const fakeHandleChange = jest.fn();
  const wrapper = shallow(
    <TextAreaComponent
      label="Title"
      id="title"
      value="My title"
      handleChange={fakeHandleChange}
      disabled="true"
      helpText="Insert your options comma separated, eg 'News, Research Analysis, Book & Culture'"
    />
  );
  expect(wrapper.find("textarea").is("[disabled]")).toBe(true);
  expect(wrapper.find("small").text()).toEqual(
    "Insert your options comma separated, eg 'News, Research Analysis, Book & Culture'"
  );
});
