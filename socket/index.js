import { Server } from "socket.io";
import dotenv from "dotenv"
import cors from "cors"

const io = new Server({
  cors: {
    origin: "https://housey-1.onrender.com",
  },
});

dotenv.config({
  path: './.env'
})


let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {  //when we are using on we are listening the event name
    addUser(userId, socket.id); //for every connection we gets a new socket id ,so we are storing a socket id corresponding to every user
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    console.log(receiver)
    io.to(receiver.socketId).emit("getMessage", data);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});
 
io.listen(process.env.PORT);
