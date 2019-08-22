import React from 'react'
import List from './../List'
import {shallow} from 'enzyme'

describe('Component Maps', () => {
    it('should renders', () => {
        const wrapper = shallow(<List/>);
        expect(wrapper.exists()).toBe(true)
    })
})