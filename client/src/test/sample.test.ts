import React, { useRef } from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SampleComponent from "../sampleComponent";

configure({ adapter: new Adapter() });

describe("<Counter />", () => {
  it("dom test ", () => {
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    // const wrapper:any = shallow(as SampleComponent);
    // expect(wrapper.length).toBe(1);
  });
});
