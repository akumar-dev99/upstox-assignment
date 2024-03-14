import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import Item from "./item";
import { AntDesign } from "@expo/vector-icons";
import ListItem from "./component/listItem";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalCurrentValue, setTotalCurrentValue] = useState(0);
  const [todaysPNL, setTodaysPNL] = useState(0);
  const [TotalPNL, setTotalPNL] = useState(0);
  const [showAllInvestmentAmountData, setShowAllInvestmentAmountData] =
    useState(false);

  const handleShowAllInvestmentAmount = () => {
    setShowAllInvestmentAmountData(!showAllInvestmentAmountData);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://run.mocky.io/v3/bde7230e-bc91-43bc-901d-c79d008bddc8"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      setData(json?.userHolding);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      // Calculate total investment and total current value
      let totalInvestmentValue = 0;
      let totalCurrentValue = 0;
      let todaysPNLValue = 0;
      data.forEach((item) => {
        totalInvestmentValue += item.avgPrice * item.quantity;
        totalCurrentValue += item.ltp * item.quantity;
        todaysPNLValue += (item.close - item.ltp) * item.quantity;
      });
      setTotalInvestment(totalInvestmentValue);
      setTotalCurrentValue(totalCurrentValue);
      setTodaysPNL(todaysPNLValue);
      setTotalPNL(totalCurrentValue - totalInvestmentValue);
    }
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={{ padding: 10, display: "flex", backgroundColor: "purple" }}>
        <Text style={{ color: "white", fontWeight: "500" }}>
          Upstox Holding
        </Text>
      </View>

      {!data?.length ? (
        <Text style={{ color: "black", fontWeight: "500" }}>
          please wait...
        </Text>
      ) : (
        <>
          {data?.map((item, index) => (
            <Item key={index} data={item} index={index} />
          ))}
          <View
            style={[
              styles.bottomView,
              {
                top: showAllInvestmentAmountData
                  ? screenHeight - 165
                  : screenHeight - 65,
              },
            ]}
          >
            <View style={{ alignItems: "center" }}>
              {
                <AntDesign
                  onPress={handleShowAllInvestmentAmount}
                  name={showAllInvestmentAmountData ? "caretdown" : "caretup"}
                  size={24}
                  color="purple"
                />
              }
            </View>
            <View style={styles.bottomInnerView}>
              {showAllInvestmentAmountData && (
                <View style={styles.otherInvestDataStyle}>
                  <ListItem
                    title={"Current Value:"}
                    amount={totalCurrentValue}
                  />
                  <ListItem
                    title={"Total Investment:"}
                    amount={totalInvestment}
                  />
                  <ListItem
                    title={"Today's Profit & Loss:"}
                    amount={todaysPNL}
                  />
                </View>
              )}
              <View>
                <View style={styles.pnl}>
                  <Text style={styles.bottomText}>Profit & Loss:</Text>
                  <Text> ₹ {TotalPNL.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    position: "relative",
  },
  bottomView: {
    backgroundColor: "white",
    position: "absolute",
    width: screenWidth,
  },
  bottomInnerView: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  otherInvestDataStyle: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
  },

  pnl: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
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
