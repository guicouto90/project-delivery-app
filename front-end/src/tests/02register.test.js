/* eslint-disable max-len */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import * as axios from '../axios';
import mockProducts from './mockProducts';

const HALF_SECOND = 500;

describe('The user is able to login successfully', () => {
  const spyPostUser = jest.spyOn(axios, 'postUsers');
  const spyGetAllProducts = jest.spyOn(axios, 'getAllProducts');

  const userName = 'Usuario de teste';
  const userEmail = 'user@test.com';

  beforeEach(() => {
    spyPostUser.mockClear();
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

  it('The user must be able to register', async () => {
    spyPostUser.mockReturnValue(
      Promise.resolve({ data: {
        id: 4,
        name: userName,
        email: userEmail,
        role: 'customer',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoieGFibGF1QHhhYmxheS5jb20iLCJpYXQiOjE2NDY4Njc0ODMsImV4cCI6MTY0NzQ3MjI4M30.TFFcvlILKrd7v-YlTnqB6gG1KJHfqcX3VxxSb5ZztlM',
      } }),
    );

    spyGetAllProducts.mockReturnValue(Promise.resolve({ data: mockProducts }));

    await act(async () => {
      const loginPageRegisterButton = await screen.findByTestId('common_login__button-register');
      expect(loginPageRegisterButton).toBeInTheDocument();
      fireEvent.click(loginPageRegisterButton);
      await new Promise((res) => setTimeout(res, HALF_SECOND));

      const registerButton = await screen.findByTestId('common_register__button-register');
      expect(registerButton).toBeInTheDocument();
      expect(registerButton).toBeDisabled();

      const registerName = await screen.findByTestId('common_register__input-name');
      expect(registerName).toBeInTheDocument();
      fireEvent.change(registerName, { target: { value: userName } });
      expect(registerName).toHaveValue(userName);

      const registerEmail = await screen.findByTestId('common_register__input-email');
      expect(registerEmail).toBeInTheDocument();
      fireEvent.change(registerEmail, { target: { value: userEmail } });
      expect(registerEmail).toHaveValue(userEmail);

      const registerPassword = await screen.findByTestId('common_register__input-password');
      expect(registerPassword).toBeInTheDocument();
      fireEvent.change(registerPassword, { target: { value: 'xablau123' } });
      expect(registerPassword).toHaveValue('xablau123');

      await new Promise((res) => setTimeout(res, HALF_SECOND));
      expect(registerButton).toBeEnabled();
      fireEvent.click(registerButton);
      await new Promise((res) => setTimeout(res, HALF_SECOND));

      const navUsername = await screen.findByTestId('customer_products__element-navbar-user-full-name');
      expect(navUsername).toBeInTheDocument();
      const logoutButton = await screen.findByTestId('customer_products__element-navbar-link-logout');
      expect(logoutButton).toBeInTheDocument();
      fireEvent.click(logoutButton);
      await new Promise((res) => setTimeout(res, HALF_SECOND));
    });
  });
});
