import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import * as axios from '../axios';
import mockProducts from './mockProducts';

describe('Login Page Test', () => {
  const emailDoZe = 'zebirita@email.com';
  const passwordDoZe = 'zebirita123';

  const spyPostLogin = jest.spyOn(axios, 'postLogin');
  const spyGetAllProducts = jest.spyOn(axios, 'getAllProducts');

  beforeEach(async () => {
    spyPostLogin.mockClear();
    spyGetAllProducts.mockResolvedValue({ data: mockProducts });

    delete localStorage.user;
  });

  it('Should render login page from the main path and be able to login succefully', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    spyPostLogin.mockResolvedValue(
      { data: {
        id: 3,
        name: 'Cliente Zé Birita',
        email: 'zebirita@email.com',
        role: 'customer',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiemViaXJpdGFAZW1haWwuY29tIiwiaWF0IjoxNjQ2ODU5NTIxLCJleHAiOjE2NDc0NjQzMjF9.r6Ll3_QZEeD-akbl6A-fZ3P5LKFrTQ-tSFm9utp9vFk',
      } },
    );

    expect(history.location.pathname).toBe('/login');

    await act(async () => {
      const emailInput = await screen.findByTestId('common_login__input-email');
      const passwordInput = await screen.findByTestId('common_login__input-password');
      const loginButton = await screen.findByTestId('common_login__button-login');

      await screen.findByTestId('common_login__button-register');

      expect(screen.getAllByText(/Login/i).length).toBe(2);
      expect(loginButton).toBeDisabled();

      fireEvent.change(emailInput, { target: { value: emailDoZe } });
      expect(emailInput).toHaveValue(emailDoZe);
      fireEvent.change(passwordInput, { target: { value: passwordDoZe } });
      expect(passwordInput).toHaveValue(passwordDoZe);

      await waitFor(() => {
        expect(loginButton).toBeEnabled();
      });
      fireEvent.click(loginButton);

      await waitFor(async () => {
        expect(history.location.pathname).toBe('/customer/products');
        await screen.findByTestId('customer_products__element-navbar-user-full-name');
      });
    });
  });

  it('Should show a message of error when password or email isn\'t right', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    spyPostLogin.mockReturnValue(undefined);

    await act(async () => {
      const emailInput = await screen.findByTestId('common_login__input-email');
      const passwordInput = await screen.findByTestId('common_login__input-password');
      const loginButton = await screen.findByTestId('common_login__button-login');
      await screen.findByTestId('common_login__button-register');

      expect(screen.getAllByText(/Login/i).length).toBe(2);
      expect(loginButton).toBeDisabled();

      fireEvent.change(emailInput, { target: { value: emailDoZe } });
      expect(emailInput).toHaveValue(emailDoZe);

      fireEvent.change(passwordInput, { target: { value: passwordDoZe } });
      expect(passwordInput).toHaveValue(passwordDoZe);

      await waitFor(() => {
        expect(loginButton).toBeEnabled();
      });
      fireEvent.click(loginButton);

      await waitFor(async () => {
        expect(history.location.pathname).toBe('/login');
        const invalidLogin = await screen.findByTestId('common_login__element-invalid-email');
        expect(invalidLogin).toHaveTextContent('Usuario ou senha invalidos');
      });
    });
  });
});
