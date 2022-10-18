import { render, screen } from '@testing-library/react';
import Converter from '../Converter';
import { Provider } from 'react-redux';
import { store } from '../../store';
let container: any;
global.matchMedia = global.matchMedia || function () {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
})

test('renders count', () => {
  render(<Provider store={store}><Converter /></Provider>);
  const inputPlaceholder = screen.getByPlaceholderText(/Введите выражение типа "15 usd in rub"/i);
  expect(inputPlaceholder).toBeInTheDocument();
});