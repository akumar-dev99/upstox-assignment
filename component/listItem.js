import { StyleSheet, Text, View } from "react-native";

export default function ListItem({ viewStyle, title, amount }) {
  return (
    <View style={[styles.nonPnl, viewStyle]}>
      <Text style={styles.bottomText}>{title} </Text>
      <Text> ₹ {amount.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nonPnl: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  bottomText: {
    fontWeight: "600",
    fontSize: 18,
  },
});

