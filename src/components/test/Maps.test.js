import React from 'react'
import MapContainer from './../Map'
import {shallow} from 'enzyme'

describe('Component Maps', () => {
    it('should renders', () => {
        const wrapper = shallow(<MapContainer/>);
        expect(wrapper.exists()).toBe(true)
    });
})