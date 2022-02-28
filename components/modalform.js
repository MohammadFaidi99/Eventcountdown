import { React, useState } from "react";
import { Formik } from "formik";
import {
  Button,
  TextInput,
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { globalStyles } from "../styles/global";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

export default function modalform({ addEvent, editEvent, closeModal, data }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  function checkEvent(values) {
    if (values.title === "") {
      Alert.alert("Empty Title!", "Please insert the event's title");
    } else if (data == null) {
      addEvent(values);
    } else {
      editEvent({ ...values, id: data.id });
      closeModal();
    }
  }

  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{
          title: data == null ? "" : data.title,
          date: data == null ? moment().toDate() : data.date,
        }}
        onSubmit={(values) => checkEvent(values)}
      >
        {(props) => {
          return (
            <View>
              <TextInput
                style={globalStyles.input}
                placeholder="Insert Event Title"
                onChangeText={props.handleChange("title")}
                value={props.values.title}
              />
              <TextInput
                style={globalStyles.input}
                placeholder="Event Date"
                selectTextOnFocus={false}
                caretHidden={true}
                value={moment(props.values.date).format("YYYY-MM-DD HH:mm:ss")}
                onPressIn={() => setDatePickerVisibility(true)}
              />
              <DateTimePicker
                isVisible={isDatePickerVisible}
                date={props.values.date}
                mode="datetime"
                minimumDate={moment().toDate()}
                is24Hour={true}
                onConfirm={(date) => {
                  props.values.date = date;
                  setDatePickerVisibility(false);
                }}
                onCancel={() => setDatePickerVisibility(false)}
              />
              <Button
                title="Submit"
                color="#00BFB2"
                onPress={props.handleSubmit}
              />
              <View style={{ marginTop: 8 }}>
                <Button title="Cancel" color="#555" onPress={closeModal} />
              </View>
            </View>
          );
        }}
      </Formik>
    </View>
  );
}

// modalform.defaultProps = {
//   dataTitle: "",
//   dataDate: moment().toDate(),
// };
