import { rotulo_btn_cadastro_meta, rotulo_input_meta } from '../mensagem'
import { StyleSheet, View, Button, TextInput } from 'react-native'
import { useState } from 'react'

export default function MetaInput(props) {

    const [inputMetaText, setInputMetaText] = useState('')
    
    function metaInputHandler(inputText) {
        setInputMetaText(inputText)
    }

    function adicionarMetaHandler(){
        props.onAddMeta(inputMetaText)
        setInputMetaText('')
    }

    return(
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', flex: 1 }}>
            <View style={{ width: '65%'}}>
                <TextInput placeholder={rotulo_input_meta} style={styles.inputText} onChangeText={metaInputHandler} value={inputMetaText} />
            </View>
            <View style={{ width: '30%'}}>
                <Button title={rotulo_btn_cadastro_meta} onPress={adicionarMetaHandler}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputText: {
        borderColor: '#cccccc',
        borderWidth: 1,
        padding: 7,
        borderRadius: 6
    },
})