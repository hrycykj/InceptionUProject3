import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import { Button, Card, Paragraph, List, useTheme, Text, Divider, TextInput, Avatar, Surface } from "react-native-paper";
import { AuthContext } from "../../firebase/AuthProvider";

const QuestReviews = (props) => {
    const authContext = useContext(AuthContext);
    const user = authContext.user
    const quest = props.quest;
    const [text, setText] = React.useState("");
    console.log(user)
    return (<>

    <Surface style={{flexDirection: 'row', flexWrap:'wrap'}}>
    <Avatar.Text size={32} label={user.email[0].toUpperCase()} />
    <Text style={{marginLeft: 8, paddingTop: 4}}>{user.email}</Text>
    </Surface>

        <TextInput
            label="Review"
            mode="outlined"
            dense
            multiline
            numberOfLines={5}
            value={text}
            onChangeText={text => setText(text)}
            style={{ backgroundColor: 'white' }}
        />
        <Card.Actions style={styles.button}>
            <Button>
                Write
            </Button>
        </Card.Actions>


    </>)
}
const styles = StyleSheet.create({
    button: {
        alignSelf: "flex-end",
        paddingHorizontal: 16,
    },
  
});
export default QuestReviews