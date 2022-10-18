import { render, act } from '@testing-library/react';
import App from '../App';
import { store } from '../store';
import { ReduxProvider, setGlobalMatchers } from '../utils/test';
let container: any;
setGlobalMatchers();


beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
})

test('renders without crash',async () => {
  const div: any = document.createElement("div");
  render(<ReduxProvider reduxStore={store}><App /></ReduxProvider>, div);

  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 50);
    });
  });
});
