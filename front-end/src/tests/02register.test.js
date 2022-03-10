/* eslint-disable max-len */
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import * as axios from '../axios';
import mockProducts from './mockProducts';

describe('Register Page Test', () => {
  const spyPostUser = jest.spyOn(axios, 'postUsers');
  const spyGetAllProducts = jest.spyOn(axios, 'getAllProducts');

  const userName = 'Usuario de teste';
  const userEmail = 'user@test.com';
  const userPassword = 'user12345';

  beforeEach(() => {
    delete localStorage.user;

    spyPostUser.mockResolvedValue(
      { data: {
        id: 4,
        name: userName,
        email: userEmail,
        role: 'customer',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoieGFibGF1QHhhYmxheS5jb20iLCJpYXQiOjE2NDY4Njc0ODMsImV4cCI6MTY0NzQ3MjI4M30.TFFcvlILKrd7v-YlTnqB6gG1KJHfqcX3VxxSb5ZztlM',
      } },
    );
    spyGetAllProducts.mockResolvedValue({ data: mockProducts });
  });

  it('The user must be able to register with valid data', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    await act(async () => {
      const loginPageRegisterButton = await screen.findByTestId('common_login__button-register');
      fireEvent.click(loginPageRegisterButton);

      await waitFor(async () => {
        expect(history.location.pathname).toBe('/register');
        const registerButton = await screen.findByTestId('common_register__button-register');
        expect(registerButton).toBeDisabled();
      });

      const registerName = await screen.findByTestId('common_register__input-name');
      fireEvent.change(registerName, { target: { value: userName } });
      expect(registerName).toHaveValue(userName);

      const registerEmail = await screen.findByTestId('common_register__input-email');
      fireEvent.change(registerEmail, { target: { value: userEmail } });
      expect(registerEmail).toHaveValue(userEmail);

      const registerPassword = await screen.findByTestId('common_register__input-password');
      fireEvent.change(registerPassword, { target: { value: userPassword } });
      expect(registerPassword).toHaveValue(userPassword);

      await waitFor(async () => {
        const registerButton = await screen.findByTestId('common_register__button-register');
        expect(registerButton).toBeEnabled();
        fireEvent.click(registerButton);
      });

      expect(history.location.pathname).toBe('/customer/products');
      await screen.findByTestId('customer_products__element-navbar-user-full-name');
    });
  });
});
