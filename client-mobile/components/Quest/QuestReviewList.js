import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import { Button, Card, Paragraph, List, useTheme, Text, Divider, TextInput, Avatar, Surface } from "react-native-paper";
import { AuthContext } from "../../firebase/AuthProvider";
import { HOST_SERVER } from "../../util/hostServer";
import { NotificationContext } from "../../context/NotificationContext";

const QuestReviewList = (props) => {
  const reviews = props.reviews
  const quest = props.quest;
  const notificationContext = useContext(NotificationContext);
  const showSnackBar = notificationContext.showSnackBar;
  return (<>
  <Surface>
    {reviews?.map(review => {
      return (
      <Surface key={review.id}>
      <Surface style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <Avatar.Text size={32} label={review.email[0].toUpperCase()} />
        <Text style={{ marginLeft: 8, paddingTop: 4 }}>{review.email}</Text>
      </Surface>
      <Text style={{ marginLeft: 48, marginBottom: 16}}>{review.text}</Text>
      <Divider style={{ paddingTop: 0, marginBottom: 8 }} />

      </Surface>
      )
    })}
    </Surface>
  </>)
}

export default QuestReviewList