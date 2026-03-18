import { StyleSheet, Text, View, Button } from 'react-native'
import { useState } from 'react'
import MetaList from './components/MetaList'
import MetaInput from './components/MetaInput'

export default function App() {
  const [metas, setMetas] = useState([])

  function adicionarMetaHandler(inputMeta){
    setMetas([...metas, inputMeta])
  }

  return (
    <View style={styles.mainContainer}>
      <MetaInput onAddMeta={adicionarMetaHandler} />
      <View style={styles.metaContainer}>
        <MetaList array={metas} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  metaContainer: {
    flex: 15
  },
});