/* eslint-disable max-len */
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import * as axios from '../axios';
import mockProducts from './mockProducts';

const HALF_SECOND = 500;

describe('The user is able to login successfully', () => {
  const emailDoZe = 'zebirita@email.com';
  const passwordDoZe = 'zebirita123';

  const spyPostLogin = jest.spyOn(axios, 'postLogin');
  const spyGetAllProducts = jest.spyOn(axios, 'getAllProducts');

  beforeEach(() => {
    spyPostLogin.mockClear();
    spyGetAllProducts.mockClear();
    delete localStorage.user;
    const history = createMemoryHistory();
    const loginPath = '/login';
    history.push(loginPath);
    return render(
      <Router history={ history }>
        <App />
      </Router>,
    );
  });

  it('Should render login page from the main path', async () => {
    spyPostLogin.mockReturnValue(
      Promise.resolve({ data: {
        id: 3,
        name: 'Cliente Zé Birita',
        email: 'zebirita@email.com',
        role: 'customer',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiemViaXJpdGFAZW1haWwuY29tIiwiaWF0IjoxNjQ2ODU5NTIxLCJleHAiOjE2NDc0NjQzMjF9.r6Ll3_QZEeD-akbl6A-fZ3P5LKFrTQ-tSFm9utp9vFk',
      } }),
    );
    spyGetAllProducts.mockReturnValue(Promise.resolve({ data: mockProducts }));

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
        await screen.findByTestId('customer_products__element-navbar-user-full-name');
      });

      // const logoutButton = await screen.findByTestId('customer_products__element-navbar-link-logout');
      // fireEvent.click(logoutButton);
      // await new Promise((res) => setTimeout(res, HALF_SECOND));
    });
  });

  it('Should show a message of errror when password or email isn"t right', async () => {
    spyPostLogin.mockReturnValue(undefined);
    await act(async () => {
      await new Promise((res) => setTimeout(res, HALF_SECOND));
      const emailInput = await screen.findByTestId('common_login__input-email');
      const passwordInput = await screen.findByTestId('common_login__input-password');
      const loginButton = await screen.findByTestId('common_login__button-login');
      const registerButton = await screen.findByTestId('common_login__button-register');

      expect(screen.getAllByText(/Login/i).length).toBe(2);
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(loginButton).toBeInTheDocument();
      expect(registerButton).toBeInTheDocument();
      expect(loginButton).toBeDisabled();

      fireEvent.change(emailInput, { target: { value: emailDoZe } });
      expect(emailInput).toHaveValue(emailDoZe);
      fireEvent.change(passwordInput, { target: { value: passwordDoZe } });
      expect(passwordInput).toHaveValue(passwordDoZe);
      await new Promise((res) => setTimeout(res, HALF_SECOND));
      expect(loginButton).toBeEnabled();
      fireEvent.click(loginButton);
      await new Promise((res) => setTimeout(res, HALF_SECOND));

      const invalidLogin = await screen.findByTestId('common_login__element-invalid-email');
      expect(invalidLogin).toBeInTheDocument();
      expect(invalidLogin).toHaveTextContent('Usuario ou senha invalidos');
    });
  });
});
