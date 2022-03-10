import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import * as axios from '../axios';
import mockProducts from './mockProducts';

describe('ProdutsPage Test', () => {
  const nameDoZe = 'Cliente Zé Birita';
  const emailDoZe = 'zebirita@email.com';
  const passwordDoZe = 'zebirita123';
  const spyPostLogin = jest.spyOn(axios, 'postLogin');
  const spyGetAllProducts = jest.spyOn(axios, 'getAllProducts');

  beforeEach(async () => {
    delete localStorage.user;

    spyPostLogin.mockResolvedValue({ data: {
      id: 3,
      name: nameDoZe,
      email: emailDoZe,
      role: 'customer',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiemViaXJpdGFAZW1haWwuY29tIiwiaWF0IjoxNjQ2OTM2MjEyLCJleHAiOjE2NDc1NDEwMTJ9.L7uwGBYm7yHzpEQbV9LCZx3deVKio6iw85J_q8QkDFY',
    } });
    spyGetAllProducts.mockResolvedValue({ data: mockProducts });

    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const emailInput = await screen.findByTestId('common_login__input-email');
    const passwordInput = await screen.findByTestId('common_login__input-password');
    const loginButton = await screen.findByTestId('common_login__button-login');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: emailDoZe } });
      fireEvent.change(passwordInput, { target: { value: passwordDoZe } });

      await waitFor(() => {
        expect(loginButton).toBeEnabled();
      });

      fireEvent.click(loginButton);
      await waitFor(async () => {
        expect(history.location.pathname).toBe('/customer/products');
      });
    });
  });

  it('Should render navBar with correct testid\'s and username', async () => {
    await screen.findByTestId('customer_products__element-navbar-link-products');
    await screen.findByTestId('customer_products__element-navbar-link-orders');
    await screen.findByTestId('customer_products__element-navbar-link-logout');

    const navUsername = await screen.findByTestId('customer_products__element-navbar-user-full-name');
    expect(navUsername).toHaveTextContent(nameDoZe);
  });

  it.each(mockProducts)('Should render all products with corret testid\'s', async (product) => {
    const productPrice = await screen.findByTestId(`customer_products__element-card-price-${product.id}`);
    expect(productPrice).toHaveTextContent(`R$ ${product.price.replace('.', ',')}`);

    const productImage = await screen.findByTestId(`customer_products__img-card-bg-image-${product.id}`);
    expect(productImage).toHaveAttribute('src', product.url_image);

    const productName = await screen.findByTestId(`customer_products__element-card-title-${product.id}`);
    expect(productName).toHaveTextContent(product.name);

    await screen.findByTestId(`customer_products__button-card-rm-item-${product.id}`);
    await screen.findByTestId(`customer_products__button-card-add-item-${product.id}`);

    const productQuantity = await screen.findByTestId(`customer_products__input-card-quantity-${product.id}`);
    expect(productQuantity).toHaveValue('0');
  });

  it('Checkout button must have the correct value when products are added to the cart', async () => {
    await act(async () => {
      const checkoutButton = await screen.findByTestId('customer_products__checkout-bottom-value');
      expect(checkoutButton).toHaveTextContent('0,00');

      await waitFor(async () => {
        const productOneInput = await screen.findByTestId('customer_products__input-card-quantity-1');
        fireEvent.change(productOneInput, { target: { value: '2' } });
        expect(productOneInput).toHaveValue('2');

        const productTreeInput = await screen.findByTestId('customer_products__input-card-quantity-3');
        fireEvent.change(productTreeInput, { target: { value: '1' } });
        expect(productTreeInput).toHaveValue('1');
      });
      const expectedValue = 2 * Number(mockProducts[0].price) + Number(mockProducts[2].price);
      expect(checkoutButton).toHaveTextContent(`${expectedValue.toFixed(2).replace('.', ',')}`);
    });
  });
});
