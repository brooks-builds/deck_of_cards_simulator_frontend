const Api = {
  actions: {
    createGame: "CreateGame",
  },
  createGame(websocket, name) {
    const message = {
      action: this.actions.createGame,
      data: { player_name: name },
    };
    websocket.send(JSON.stringify(message));
  },
};

export default Api;
