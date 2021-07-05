class MessageBuilder {
  setAction(action) {
    this.action = action;
    return this;
  }

  setPlayerName(playerName) {
    this.playerName = playerName;
    return this;
  }

  setRoomId(roomId) {
    this.roomId = roomId;
    return this;
  }

  setChatMessage(message) {
    this.message = message;
    return this;
  }

  build() {
    return {
      action: this.action,
      data: {
        player_name: this.playerName,
        room_id: this.roomId,
        message: this.message,
      },
    };
  }
}

export default MessageBuilder;
