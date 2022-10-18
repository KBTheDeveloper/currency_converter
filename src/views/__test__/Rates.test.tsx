import { render, screen } from '@testing-library/react';
import Rates from '../Rates';
import { ReduxProvider, setGlobalMatchers } from '../../utils/test';
import { store } from '../../store';
setGlobalMatchers();

test('select value test', async () => {
  render(<ReduxProvider reduxStore={store}><Rates/></ReduxProvider>);
  const selected = screen.getByTitle('RUB');
  expect(selected).toBeTruthy();
})
