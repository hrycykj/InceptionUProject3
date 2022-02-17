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


const QuestFilter = (props) => {
    // const [quests, setQuests] = useState([]);
    // const [modalQuest, setModalQuest] = useState();
    // const questContext = useContext(QuestContext);
    const notificationContext = useContext(NotificationContext);
    // const currentQuest = questContext.quest;
    const showModal = notificationContext.showModal;
    const [checked, setChecked] = useState('first');
    // const checked = props.checked
    // const setChecked = props.setChecked
    const defaultTheme = useTheme();
    const [completedChecked, setCompletedChecked] = useState(false);
    const [locationChecked, setLocationChecked] = useState(false);
    const [showCompletedQuests, setShowCompletedQuests] = useState(true);
    const [filterLocation, setFilterLocation] = useState(false)

    const { colors } = useTheme();
    const onPressCompleted = () => {
        completedChecked ? setShowCompletedQuests(false) : setShowCompletedQuests(true) //Checked is false, no check is true (False means completed quests are not hidden)
        setCompletedChecked(!completedChecked)
        console.log('Completed Checked off', showCompletedQuests)
    }
    const onPressLocation = () => {
        locationChecked ? setFilterLocation(true) : setFilterLocation(false) //this time its normal
        setLocationChecked(!locationChecked)
        console.log('Location Checked off', filterLocation)
    }



    return (

        <>
            <View style={{ ...defaultTheme }, { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background }}>
                <View>
                    <Text>Hide Completed</Text>
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