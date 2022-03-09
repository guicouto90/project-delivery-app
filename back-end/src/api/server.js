const port = process.env.PORT || 3001;
const { Server } = require("socket.io");
const http = require("./app");
const {
  getSaleById,
  editSaleStatus,
} = require('../database/services/salesService');

const io = new Server(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT'],
  },
});

io.on('connection', (socket) => {
  socket.on('Entregue', async (id) => {
    socket.join(id);
    await editSaleStatus(id, 'Entregue');
    const sale = await getSaleById(id);

    io.emit('refreshDelivery', sale);
  });

  socket.on('Preparando', async (id) => {
    socket.join(id);
    await editSaleStatus(id, 'Preparando');
    const sale = await getSaleById(id);

    io.emit('refreshPreparing', sale);
  });

  socket.on('Em Trânsito', async (id) => {
    socket.join(id);
    await editSaleStatus(id, 'Em Trânsito');
    const sale = await getSaleById(id);

    io.emit('refreshDispatch', sale);
  });
});

http.listen(port);
console.log(`Api rodando na porta ${port}`);
