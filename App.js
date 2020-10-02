import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";

export default function App() {
  constructor(props) {
    super(props);
    this.state = {
      gameState = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer = 1
    }
  }
  componentDidMount() {
    this.init();
  }




  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={"red"}
        barStyle={"dark-content"}
        translucent={false}
      />
      <View style={styles.rows}>
        <View style={[styles.boxes, { borderTopWidth: 0, borderLeftWidth: 0 }]}>
          <Icon name="close" style={styles.iconX}></Icon>
          <Icon name="circle-outline" style={styles.iconO}></Icon>
        </View>
        <View style={[styles.boxes, { borderTopWidth: 0 }]}></View>
        <View
          style={[styles.boxes, { borderTopWidth: 0, borderRightWidth: 0 }]}
        ></View>
      </View>
      <View style={styles.rows}>
        <View style={[styles.boxes, { borderLeftWidth: 0 }]}></View>
        <View style={styles.boxes}></View>
        <View style={[styles.boxes, { borderRightWidth: 0 }]}></View>
      </View>
      <View style={styles.rows}>
        <View
          style={[styles.boxes, { borderBottomWidth: 0, borderLeftWidth: 0 }]}
        ></View>
        <View style={[styles.boxes, { borderBottomWidth: 0 }]}></View>
        <View
          style={[styles.boxes, { borderBottomWidth: 0, borderRightWidth: 0 }]}
        ></View>
      </View>
      <AppButton title="New Game" size="sm" backgroundColor="#007bff" />
    </View>
  );
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
