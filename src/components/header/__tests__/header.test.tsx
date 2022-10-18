import { store } from "../../../store";
import { screen, render } from "@testing-library/react";
import Header from "..";
import { ReduxProvider, setGlobalMatchers } from "../../../utils/test";
setGlobalMatchers();

test('renders home route', async () => {
  render(<ReduxProvider reduxStore={store}><Header /></ReduxProvider>);
  const elements = await screen.findAllByText(/Курсы валют/i);
  expect(elements[0]).toHaveAttribute("href", "/");
  expect(elements[0]).toHaveTextContent("Курсы валют");
});

test('renders converter route', async () => {
  render(<ReduxProvider reduxStore={store}><Header /></ReduxProvider>);
  const elements = await screen.findAllByText(/Конвертер валют/i);
  expect(elements[0]).toHaveAttribute("href", "/converter");
  expect(elements[0]).toHaveTextContent("Конвертер валют");
});