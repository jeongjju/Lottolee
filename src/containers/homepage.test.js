import { TestScheduler } from 'jest';
import React from 'react';
import renderer from 'react-test-renderer';
import Homepage from './homepage';

test('Homepage', () => {

	let component = null;

	component = renderer.create(
		<Homepage></Homepage>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();


});