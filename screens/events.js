import { React, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Modal from "react-native-modal";
import { globalStyles } from "../styles/global";
import Card from "../components/card.js";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Eventmodalform from "../components/modalform.js";
import { SwipeListView } from "react-native-swipe-list-view";
import Parse from "parse/react-native.js";
import moment from "moment";

export default function Events({ navigation }) {
  const [modalOpen, setmodalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalValues, setmodalValues] = useState(null);

  const readEvents = async function () {
    const parseQuery = new Parse.Query("Events");
    parseQuery.greaterThan("date", moment().toDate());
    parseQuery.ascending("date");

    try {
      let allEvents = await parseQuery.find();

      const eventsJSON = allEvents.map((e) => {
        return { id: e.id, title: e.get("title"), date: e.get("date") };
      });

      setEvents(eventsJSON);
      setLoading(false);
    } catch (error) {
      Alert.alert("Reading Error!", error.message);
    }
  };

  async function addEvent(newEvent) {
    const event = new Parse.Object("Events");
    event.set("title", newEvent.title);
    event.set("date", newEvent.date);

    try {
      let result = await event.save();
      readEvents();
      setmodalOpen(false);
    } catch (error) {
      Alert.alert("Addition Error!", error.message);
    }
  }

  async function editEvent(data) {
    const event = new Parse.Object("Events");

    event.set("id", data.id);
    setmodalValues({ title: data.title, date: data.date, id: data.id });
    setmodalOpen(true);

    event.set("title", data.title);
    event.set("date", data.date);

    try {
      await event.save();
      readEvents();
    } catch (error) {
      Alert.alert("Updating Error!", error.message);
    }
  }

  async function deleteEvent(id) {
    const event = new Parse.Object("Events");

    event.set("id", id);
    try {
      await event.destroy();
      readEvents();
    } catch (error) {
      Alert.alert("Deletion Error!", error.message);
    }
  }

  const renderHiddenItem = (data) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteEvent(data.item.id)}
      >
        <Ionicons name="trash-bin-sharp" color="#00BFB2" size={32} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backLeftBtn, styles.backRightBtnLeft]}
        onPress={() => editEvent(data.item)}
      >
        <AntDesign name="edit" size={32} color="#00BFB2" />
      </TouchableOpacity>
    </View>
  );
  const onRefresh = async () => {
    setRefreshing(true);
    await readEvents();
    setRefreshing(false);
  };

  useEffect(() => {
    readEvents();
  }, []);

  if (loading) {
    return (
      <View style={globalStyles.center}>
        <ActivityIndicator color="#00BFB2" size="large" />
      </View>
    );
  } else {
    return (
      <View style={globalStyles.containernopad}>
        <Modal
          animationType="slide"
          isVisible={modalOpen}
          onRequestClose={() => setmodalOpen(false)}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.wrapper}>
              <View style={styles.modalContent}>
                <Eventmodalform
                  addEvent={addEvent}
                  editEvent={editEvent}
                  closeModal={() => setmodalOpen(false)}
                  data={modalValues}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <SwipeListView
          disableRightSwipe
          data={events}
          rightOpenValue={-155}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={() => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setmodalValues(null);
                  setmodalOpen(true);
                }}
              >
                <Card>
                  <Ionicons style={styles.addIcon} name="add" size={24} />
                </Card>
              </TouchableOpacity>
            );
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  navigation.navigate("Event", JSON.stringify(item));
                }}
              >
                <Card>
                  <View style={globalStyles.container}>
                    <Text style={globalStyles.titleText}>{item.title}</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          }}
          renderHiddenItem={renderHiddenItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addIcon: {
    alignSelf: "center",
    color: "#00BFB2",
  },
  deleteIcon: {
    color: "white",
  },
  modalContent: {
    width: "80%",
    elevation: 5,
    height: 250,
    backgroundColor: "#fff",
    borderRadius: 7,
    padding: 20,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#ddd",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 10,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    borderRadius: 4,
    backgroundColor: "#E9E9E9",
  },

  backRightBtnRight: {
    right: 0,
  },
  backLeftBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    borderRadius: 4,
    backgroundColor: "#E9E9E9",
  },
  backRightBtnLeft: {
    right: 76,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
