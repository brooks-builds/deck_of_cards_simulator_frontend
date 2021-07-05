import MessageBuilder from "./message";

const Api = {
  actions: {
    createGame: "CreateGame",
    joinRoom: "JoinRoom",
  },
  createGame(websocket, name) {
    const message = {
      action: this.actions.createGame,
      data: { player_name: name },
    };
    websocket.send(JSON.stringify(message));
  },
  joinRoom(websocket, roomId, playerName) {
    const message = {
      action: this.actions.joinRoom,
      data: { room_id: roomId, player_name: playerName },
    };
    console.log("built message for chatting", message);
    websocket.send(JSON.stringify(message));
  },
  sendChatMessage(websocket, chatMessage, name, roomId) {
    const message = new MessageBuilder()
      .setAction("Chat")
      .setRoomId(roomId)
      .setPlayerName(name)
      .setChatMessage(chatMessage)
      .build();
    websocket.send(JSON.stringify(message));
  },
};

export default Api;
