const port = process.env.PORT || 3001;
const { Server } = require('socket.io');
const http = require('./app');
const {
  getSaleById,
  editSaleStatus,
  getAllSales,
} = require('../database/services/salesService');

const io = new Server(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT'],
  },
});

io.on('connection', (socket) => {
  socket.on('Entregue', async (id) => {
    await editSaleStatus(id, 'Entregue');
    const saleById = await getSaleById(id);
    const allSales = await getAllSales();

    io.emit('refreshDelivery', { saleById, allSales });
  });

  socket.on('Preparando', async (id) => {
    await editSaleStatus(id, 'Preparando');
    const saleById = await getSaleById(id);
    const allSales = await getAllSales();

    io.emit('refreshPreparing', { saleById, allSales });
  });

  socket.on('Em Trânsito', async (id) => {
    await editSaleStatus(id, 'Em Trânsito');
    const saleById = await getSaleById(id);
    const allSales = await getAllSales();

    io.emit('refreshDispatch', { saleById, allSales });
  });
});

http.listen(port);
console.log(`Api rodando na porta ${port}`);
