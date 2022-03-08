/* import io from 'socket.io-client';

const updateStatusSeller = (status, setSale, id) => {
  const socket = io('http://localhost:3001');
  console.log(status);
  console.log(id);
  if (status === 'Preparando') {
    socket.on('refreshPreparing', (saleSocket) => {
      if (id === saleSocket.id) setSale({ ...saleSocket, status: 'Preparando' });
    });
  } else if (status === 'Em Trânsito') {
    socket.on('refreshStatus', (saleSocket) => {
      if (id === saleSocket.id) setSale({ ...saleSocket, status: 'Em Trânsito' });
    });
  } else {
    socket.on('refreshDelivery', (saleSocket) => {
      if (id === saleSocket.id) setSale({ ...saleSocket, status: 'Entregue' });
    });
  }
};

const updateStatusClient = (status, setSale, id) => {
  const socket = io('http://localhost:3001');
  console.log(status);
  console.log(id);
  if (status === 'Preparando') {
    socket.on('refreshPreparing', (saleSocket) => {
      if (id === saleSocket.id) setSale({ ...saleSocket, status: 'Preparando' });
    });
  } else if (status === 'Em Trânsito') {
    socket.on('refreshStatus', (saleSocket) => {
      if (id === saleSocket.id) setSale({ ...saleSocket, status: 'Em Trânsito' });
    });
  } else {
    socket.on('refreshDelivery', (saleSocket) => {
      if (id === saleSocket.id) setSale({ ...saleSocket, status: 'Entregue' });
    });
  }
};

export default { updateStatusSeller, updateStatusClient }; */
