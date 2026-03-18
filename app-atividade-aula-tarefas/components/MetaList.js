import { ScrollView } from 'react-native-web'
import { StyleSheet, Text } from 'react-native'

export default function MetaList(props) {
    return(
        <ScrollView>
            {props.array.map((meta, index) => (
                <Text key={index} style={styles.item}>{meta}</Text>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    item: {
        margin: 8,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'lightblue'
    }
})