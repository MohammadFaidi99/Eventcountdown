import { React, useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, RefreshControl } from "react-native";
import { globalStyles } from "../styles/global";
import Card from "../components/card.js";
import moment from "moment";
import { interval } from "rxjs";

export default function Event({ navigation, route }) {
  const [timeleft, setTimeleft] = useState("");
  let event = JSON.parse(route.params);

  const observable = interval(1000);

  const subscription = observable.subscribe(() => recalculate());

  function recalculate() {
    let eventdatemoment = moment(event.date);
    var ms = eventdatemoment.diff(moment());
    var d = moment.duration(ms);
    setTimeleft(
      `Years: ${d.years()}, Months: ${d.months()}, Days: ${d.days()}, Hours: ${d.hours()}, Minutes: ${d.minutes()}, Seconds: ${d.seconds()}`
    );
  }

  useEffect(() => {
    recalculate();
    return function cleanup() {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <View style={styles.center}>
      <Card>
        <Text style={globalStyles.titleText}>{event.title}</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text>Event Date:</Text>
          <Text style={{ fontWeight: "bold", marginLeft: 5 }}>
            {moment(event.date).format("YYYY-MM-DD")}
          </Text>
        </View>

        <Text style={styles.header}>Time Left:</Text>
        <Text>{timeleft}</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  header: {
    fontWeight: "bold",
    marginTop: 10,
  },
});
