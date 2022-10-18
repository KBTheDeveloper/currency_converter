import { screen, render, fireEvent } from "@testing-library/react";
import { store } from "../../../store";
import { ReduxProvider, setGlobalMatchers } from "../../../utils/test";
import CurrencyInput from "../Input";
setGlobalMatchers();

test('renders placeholder', () => {
  render(<ReduxProvider reduxStore={store}><CurrencyInput /></ReduxProvider>);
  const inputPlaceholder = screen.getByPlaceholderText(/Введите выражение типа "15 usd in rub"/i);
  expect(inputPlaceholder).toBeInTheDocument();
});

test('It should receive "20 eur in usd"', () => {
  render(<ReduxProvider reduxStore={store}><CurrencyInput /></ReduxProvider>);
  const input: HTMLInputElement = screen.getByPlaceholderText('Введите выражение типа "15 usd in rub"');
  fireEvent.change(input, {target: {value: '20 eur in usd'}});
  expect(input?.value).toBe('20 eur in usd');
})

test('It should be no error class', () => {
  const {container} = render(<ReduxProvider reduxStore={store}><CurrencyInput /></ReduxProvider>);
  const input: HTMLInputElement = screen.getByPlaceholderText('Введите выражение типа "15 usd in rub"');
  fireEvent.change(input, {target: {value: '20 eur in usd'}});
  // eslint-disable-next-line testing-library/no-container
  expect(container.classList.contains(".ant-input-status-error")).toBe(false);
})

test('It should be no error', () => {
  render(<ReduxProvider reduxStore={store}><CurrencyInput /></ReduxProvider>);
  const input: HTMLInputElement = screen.getByPlaceholderText('Введите выражение типа "15 usd in rub"');
  fireEvent.change(input, {target: {value: '20 eur in usd'}});
  // eslint-disable-next-line testing-library/no-container
  expect(input.classList.contains("ant-input-status-error")).toBe(false);
})

test('It should error', () => {
 render(<ReduxProvider reduxStore={store}><CurrencyInput /></ReduxProvider>);
  const input: HTMLInputElement = screen.getByPlaceholderText('Введите выражение типа "15 usd in rub"');
  fireEvent.change(input, {target: {value: '214 42'}});
  // eslint-disable-next-line testing-library/no-container
  expect(input.classList.contains("ant-input-status-error")).toBe(true);
})