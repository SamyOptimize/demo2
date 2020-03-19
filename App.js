import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Updates } from "expo";

export default class App extends Component {
  state = { error: "", status: "" };
  handleUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        this.setState({
          status: "New update found"
        });
        await Updates.fetchUpdateAsync();
        Updates.reloadFromCache();
      } else
        this.setState({
          status: "no update found"
        });
    } catch (e) {
      console.log(e);

      this.setState({ error: JSON.stringify(e) });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Button title="Check update" onPress={this.handleUpdates} />
        <Text selectable>Status:{this.state.status}</Text>
        <Text selectable>Error:{this.state.error}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
