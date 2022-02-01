import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Snackbar,
  Text,
  Portal,
  Modal,
  Provider,
} from "react-native-paper";

const NotificationContext = React.createContext();

const NotificationContextProvider = (props) => {
  const children = props.children;
  /***** SnackBar *****/
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarLabel, setSnackBarLabel] = useState("");
  const [snackBarAction, setSnackBarAction] = useState();
  const showSnackBar = (message, label, action) => {
    setSnackBarMessage(message);
    setSnackBarLabel(label);
    setSnackBarAction(() => () => {
      action;
    });
    setVisibleSnackBar(true);
  };

   /***** Modal *****/
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalChildren, setModalChildren] = useState();
  const hideModal = () => setVisibleModal(false);
  const showModal = (modalChildren) => {
    setModalChildren(modalChildren);
    setVisibleModal(true);
  };

  const theValues = { showSnackBar, showModal, hideModal };
  return (
    <NotificationContext.Provider value={theValues}>
      {children}
      <AppModal visible={visibleModal} hideModal={hideModal}>
        {modalChildren}
      </AppModal>
      <AppSnackBar
        message={snackBarMessage}
        label={snackBarLabel}
        onPressLabel={snackBarAction}
        visible={visibleSnackBar}
        setVisible={setVisibleSnackBar}
      />
    </NotificationContext.Provider>
  );
};

const AppSnackBar = ({ message, label, onPressLabel, visible, setVisible }) => {
  const onDismissSnackBar = () => setVisible(false);
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      action={{
        label: label,
        onPress: () => {
          onPressLabel();
          setVisible(false);
        },
      }}
    >
      {message}
    </Snackbar>
  );
};

const AppModal = ({ children, visible, hideModal }) => {
  const containerStyle = { margin: 16 };

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={containerStyle}
    >
      {children}
    </Modal>
  );
};

module.exports = { NotificationContext, NotificationContextProvider };
