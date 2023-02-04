import React from 'react';
import { render } from '@testing-library/react';
import MealDetails from '../Pages/MealDetails';

describe('Testando do componente Header', () => {
  it('teste o componente Header.', () => {
    const { asFragment } = render(<MealDetails />);

    expect(asFragment()).toMatchSnapshot();
  });
});
