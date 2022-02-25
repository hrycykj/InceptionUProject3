import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import { Button, Card, Paragraph, List, useTheme, Text, Divider, TextInput, Avatar, Surface } from "react-native-paper";
import { AuthContext } from "../../firebase/AuthProvider";
import { HOST_SERVER } from "../../util/hostServer";
import { NotificationContext } from "../../context/NotificationContext";
import axios from 'axios'
import QuestReviewList from "./QuestReviewList";

const QuestReviews = (props) => {
    const authContext = useContext(AuthContext);
    const user = authContext.user
    const quest = props.quest;
    const [text, setText] = React.useState("");
    const [reviews, setReviews] = React.useState([]);
    const notificationContext = useContext(NotificationContext);
    const showSnackBar = notificationContext.showSnackBar;
    const writeReview = () =>{
        axios.post(`${HOST_SERVER}/api/review`, {
            user, quest, text
        }).then((res)=>{
            if(res.data){
                showSnackBar("Review is posted", "OK");
                setText('')
                getReviews()
            }
        }).catch((error)=>{
            showSnackBar("An error occurred", "OK");
            console.log(error)
        })
    }
    useEffect(()=>{
        getReviews()
    },[])
    const getReviews = () =>{
        axios.get(`${HOST_SERVER}/api/review/${quest.id}`)
        .then(res=>{
            setReviews(res.data)
        }).catch((error)=>{
            showSnackBar("An error occurred getting reviews", "OK");
            console.log(error)
        })
    }
    return (<>
        <Surface style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Avatar.Text size={32} label={user.email[0].toUpperCase()} />
            <Text style={{ marginLeft: 8, paddingTop: 4 }}>{user.email}</Text>
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
            <Button onPress={()=>{
                writeReview()
            }}>
                Write
            </Button>
        </Card.Actions>
        <Divider style={{ paddingTop: 0, marginBottom: 8 }} />
        <QuestReviewList quest={quest} reviews={reviews} />

    </>)
}
const styles = StyleSheet.create({
    button: {
        alignSelf: "flex-end",
        paddingHorizontal: 16,
    },

});
export default QuestReviews