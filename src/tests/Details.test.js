import React from 'react';
import { render } from '@testing-library/react';

import DrinkDetails from '../Pages/DrinkDetails';

describe('Testando do componente Header', () => {
  it('teste o componente Header.', () => {
    const { asFragment } = render(<DrinkDetails />);

    expect(asFragment()).toMatchSnapshot();
  });
});
