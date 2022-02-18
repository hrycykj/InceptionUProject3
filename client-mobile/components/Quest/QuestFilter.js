import {
    Modal,
    Portal,
    Text,
    Subheading,
    Button,
    Provider,
    useTheme,
    Searchbar,
    DefaultTheme,
    RadioButton,
} from "react-native-paper";
import { ScrollView, View } from "react-native";
import { NotificationContext } from "../../context/NotificationContext";
import { useContext, useState } from "react";
import {QuestContext} from "../../context/QuestContext";

const QuestFilter = (props) => {
    // const [quests, setQuests] = useState([]);
    // const [modalQuest, setModalQuest] = useState();
    const questContext = useContext(QuestContext);
    const notificationContext = useContext(NotificationContext);
    // const currentQuest = questContext.quest;
    const showModal = notificationContext.showModal;
    const [checked, setChecked] = useState('first');
    const filterFlag = props.filterFlag
    const setFilterFlag = props.setFilterFlag
    const defaultTheme = useTheme();
    const completedChecked = questContext.completedChecked;
    const setCompletedChecked = questContext.setCompletedChecked;
    const locationChecked = questContext.locationChecked; 
    const setLocationChecked = questContext.setLocationChecked;
    const showCompletedQuests = questContext.showCompletedQuests;
    const setShowCompletedQuests = questContext.setShowCompletedQuests;
    const [filterLocation, setFilterLocation] = useState(false)

    const { colors } = useTheme();
    const onPressCompleted = () => {
        completedChecked ? setShowCompletedQuests(false) : setShowCompletedQuests(true) //Checked is false, no check is true (False means completed quests are not hidden)
        setCompletedChecked(!completedChecked)
        console.log('Completed Checked off', showCompletedQuests)
    }
    const onPressLocation = () => {
        locationChecked ? setFilterLocation(true) : setFilterLocation(false) //this time its normal
        !locationChecked ? setFilterFlag(true) : console.log("something random") //this ones not normal
        setLocationChecked(!locationChecked)
        console.log('Location Checked off', filterLocation)
    }

    

    return (

        <>
            <View style={{ ...defaultTheme }, { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background }}>
                <View>
                    <Text>Show Completed</Text>
                    <RadioButton
                        value="first"
                        status={completedChecked === true ? 'checked' : 'unchecked'}
                        onPress={() => onPressCompleted()}
                
                    />
                    <Text>By location</Text>
                    <RadioButton
                        value="second"
                        status={locationChecked === true ? 'checked' : 'unchecked'}
                        onPress={() => onPressLocation()}
                    />
                </View>
            </View>
        </>

    )
}

export default QuestFilter