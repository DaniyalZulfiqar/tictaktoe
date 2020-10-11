import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
      boxesSelected: 0,
    };
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
      boxesSelected: 0,
    });
  };

  iconDisplay = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.iconX}></Icon>;
      case -1:
        return <Icon name="circle-outline" style={styles.iconO}></Icon>;
      default:
        return;
    }
  };

  onBoxClick = (row, col) => {
    // Avoid updating the same tile
    var value = this.state.gameState[row][col];
    if (value != 0) {
      return;
    }

    // number of boxes filled!
    var numofSelections = this.state.boxesSelected;
    numofSelections += 1;
    this.setState({ boxesSelected: numofSelections });

    // switch to next player
    var player = this.state.currentPlayer;
    this.setState({ currentPlayer: player * -1 });

    // update the board box with correct value
    var array = this.state.gameState.slice();
    array[row][col] = player;
    this.setState({ gameState: array });

    // Check for winner
    var winner = this.checkWinner();
    var numofSelections = this.state.boxesSelected;
    console.log(numofSelections);
    if (winner == 1) {
      Alert.alert("Player 1 Wins");
      this.init();
    } else if (winner == -1) {
      Alert.alert("Player 2 Wins");
      this.init();
    } else if (numofSelections === 8) {
      Alert.alert(" Game Drawn");
      this.init();
    }
  };

  checkWinner = () => {
    var board = this.state.gameState;
    var sum;
    // Check in rows
    for (var i = 0; i < board.length; i += 1) {
      sum = board[i][0] + board[i][1] + board[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    // Check in cols
    for (var i = 0; i < board.length; i += 1) {
      sum = board[0][i] + board[1][i] + board[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    // Check Digonally
    sum = board[0][0] + board[1][1] + board[2][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    sum = board[2][0] + board[1][1] + board[0][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    // No winner Found
    return 0;
  };

  newGame = () => {
    this.init();
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={"red"}
          barStyle={"dark-content"}
          translucent={false}
        />
        <View style={styles.rows}>
          <TouchableOpacity
            onPress={() => {
              this.onBoxClick(0, 0);
            }}
            style={[styles.boxes, { borderTopWidth: 0, borderLeftWidth: 0 }]}
          >
            {this.iconDisplay(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.onBoxClick(0, 1);
            }}
            style={[styles.boxes, { borderTopWidth: 0 }]}
          >
            {this.iconDisplay(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.onBoxClick(0, 2);
            }}
            style={[styles.boxes, { borderTopWidth: 0, borderRightWidth: 0 }]}
          >
            {this.iconDisplay(0, 2)}
          </TouchableOpacity>
        </View>
        <View style={styles.rows}>
          <TouchableOpacity
            onPress={() => {
              this.onBoxClick(1, 0);
            }}
            style={[styles.boxes, { borderLeftWidth: 0 }]}
          >
            {this.iconDisplay(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.onBoxClick(1, 1);
            }}
            style={styles.boxes}
          >
            {this.iconDisplay(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.onBoxClick(1, 2);
            }}
            style={[styles.boxes, { borderRightWidth: 0 }]}
          >
            {this.iconDisplay(1, 2)}
          </TouchableOpacity>
        </View>
        <View style={styles.rows}>
          <TouchableOpacity
            onPress={() => {
              this.onBoxClick(2, 0);
            }}
            style={[styles.boxes, { borderBottomWidth: 0, borderLeftWidth: 0 }]}
          >
            {this.iconDisplay(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.onBoxClick(2, 1);
            }}
            style={[styles.boxes, { borderBottomWidth: 0 }]}
          >
            {this.iconDisplay(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.onBoxClick(2, 2);
            }}
            style={[
              styles.boxes,
              { borderBottomWidth: 0, borderRightWidth: 0 },
            ]}
          >
            {this.iconDisplay(2, 2)}
          </TouchableOpacity>
        </View>
        <AppButton
          title="New Game"
          onPress={() => {
            this.newGame();
          }}
          size="sm"
          backgroundColor="#007bff"
        />
      </View>
    );
  }
}

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5eeafb",
    alignItems: "center",
    justifyContent: "center",
  },
  boxes: {
    width: 100,
    height: 100,
    borderColor: "#009688",
    borderWidth: 4,
    backgroundColor: "#FFC107",
    alignItems: "center",
    justifyContent: "center",
  },
  rows: {
    flexDirection: "row",
    backgroundColor: "#FFC107",
  },
  appButtonContainer: {
    margin: 10,
    elevation: 8,
    backgroundColor: "green",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  iconO: {
    color: "red",
    fontSize: 80,
  },
  iconX: {
    color: "blue",
    fontSize: 80,
  },
});
