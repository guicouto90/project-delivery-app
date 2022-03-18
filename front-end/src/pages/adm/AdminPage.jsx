import React, { useState, useEffect } from 'react';
import { deleteUserById, getUsersToAdmin, postUsers } from '../../axios';
import CustomNavBar from '../components/CustomNavBar';

function AdminPage() {
  const userObject = {
    name: '',
    email: '',
    password: '',
    role: 'seller',
  };

  const localUser = JSON.parse(localStorage.user);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState(userObject);
  const [error, setError] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  // const [loadPage, setLoadPage] = useState(true);

  useEffect(() => {
    const getUsers = async (axiosToken) => {
      const allUsers = await getUsersToAdmin(axiosToken);
      setUsers(allUsers);
    };

    getUsers(localUser.token);
  }, [localUser.token]);

  const disableRegisterButton = () => {
    const { name, email, password } = newUser;
    const TWELVE = 12;
    const SIX = 6;
    const re = /\S+@\S+\.\S+/;
    if (name.length >= TWELVE && re.test(email) && password.length >= SIX) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  useEffect(() => {
    console.log('TESTE');
    disableRegisterButton();
  }, [newUser]);

  return (
    <>
      <CustomNavBar />
      <div>
        <h3>Cadastrar novo usuário</h3>
        <label htmlFor="Name">
          Nome:
          <input
            type="text"
            value={ newUser.name }
            onChange={
              ({ target }) => { setNewUser({ ...newUser, name: target.value }); }
            }
            data-testid="admin_manage__input-name"
          />
        </label>
        <label htmlFor="Email">
          Email:
          <input
            type="text"
            value={ newUser.email }
            onChange={
              ({ target }) => { setNewUser({ ...newUser, email: target.value }); }
            }
            data-testid="admin_manage__input-email"
          />
        </label>
        <label htmlFor="Password">
          Senha:
          <input
            type="password"
            value={ newUser.password }
            onChange={
              ({ target }) => { setNewUser({ ...newUser, password: target.value }); }
            }
            data-testid="admin_manage__input-password"
          />
        </label>
        <label htmlFor="role">
          Tipo:
          <select
            value={ newUser.role }
            onChange={ ({ target: { value } }) => {
              setNewUser({ ...newUser, role: value });
            } }
            data-testid="admin_manage__select-role"
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
          </select>
        </label>
        <button
          type="button"
          disabled={ disableButton }
          onClick={ () => {
            const { name, email, password, role } = newUser;

            const postNewUser = async () => {
              const result = await postUsers(
                { name, email, password, role }, localUser.token,
              );
              if (!result) setError(true);
              else {
                setUsers([...users, newUser]);
                const userObject2 = { name: '', email: '', password: '', role: 'seller' };
                setNewUser(userObject2);
              }
            };

            postNewUser();
          } }
          data-testid="admin_manage__button-register"
        >
          CADASTRAR
        </button>
        {
          !error
            ? ''
            : <p data-testid="admin_manage__element-invalid-register">Error</p>
        }

      </div>
      <h3>Lista de usuários</h3>
      <table>
        <tr>
          <th>Item</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Tipo</th>
          <th>Excluir</th>
        </tr>
        {users.map((user, index) => (
          <tr key={ index }>
            <td
              data-testid={ `admin_manage__element-user-table-item-number-${index + 1}` }
            >
              {index + 1}
            </td>
            <td data-testid={ `admin_manage__element-user-table-name-${index + 1}` }>
              {user.name}
            </td>
            <td data-testid={ `admin_manage__element-user-table-email-${index + 1}` }>
              {user.email}
            </td>
            <td data-testid={ `admin_manage__element-user-table-role-${index + 1}` }>
              {user.role}
            </td>
            <td>
              <button
                data-testid={ `admin_manage__element-user-table-remove-${index + 1}` }
                type="button"
                onClick={ () => {
                  const deleteUser = async () => {
                    await deleteUserById(user.id, localUser.token);
                  };
                  deleteUser();
                  setUsers(users.filter((fUser) => fUser.id !== user.id));
                } }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default AdminPage;
