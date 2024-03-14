import { Dimensions, Text, View } from "react-native";

export default function Item({ data, index }) {
  const width = Dimensions.get("window").width;
  const currentValue = data?.ltp * data?.quantity;
  const investmentValue = data?.avgPrice * data?.quantity;
  const PNL = currentValue - investmentValue;
  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: width,
          justifyContent: "space-between",
          padding: 5,
          borderBottomColor: "#d1d1d1",
          borderBottomWidth: 1,
          backgroundColor: "white",
        }}
      >
        <View>
          <Text style={{ fontWeight: "600", fontSize: 14, marginTop: 5 }}>
            {data.symbol}
          </Text>
          <Text style={{ fontSize: 12, marginTop: 5 }}>{data.quantity}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ marginTop: 5 }}>
            LTP:{" "}
            <Text style={{ fontWeight: "500", fontSize: 13 }}>
              {" "}
              ₹ {data.ltp.toFixed(2)}
            </Text>
          </Text>
          <Text style={{ marginTop: 5 }}>
            P/L:{" "}
            <Text style={{ fontWeight: "500", fontSize: 13 }}>
              ₹ {PNL.toFixed(2)}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
