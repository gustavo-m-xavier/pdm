import { StyleSheet, Text, View } from 'react-native'
import { rotulo_btn_cadastro_meta, rotulo_input_meta, rotulo_lista_metas } from './mensagem'
import { Button, TextInput } from 'react-native-web'

export default function App() {
  return (
    <View style={styles.mainContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', flex: 1 }}>
        <View style={{ width: '65%'}}>
          <TextInput placeholder={rotulo_input_meta} style={styles.inputText} />
        </View>
        <View style={{ width: '30%'}}>
          <Button title={rotulo_btn_cadastro_meta} />
        </View>
      </View>
      <View style={styles.metaContainer}>
        <Text>{rotulo_lista_metas}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  inputText: {
    borderColor: '#cccccc',
    borderWidth: 1,
    padding: 7,
    borderRadius: 6
  },
  metaContainer: {
    flex: 1
  }
});