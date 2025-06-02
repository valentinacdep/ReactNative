import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    Alert,
    FlatList
} from 'react-native';
import { listarVagas, ocuparVaga, desocuparVaga } from "../services/api";

export default function VagasScreen({ route }) {
    const [vagas, setVagas] = useState([])
    //route chama o valor do usuário (variavel user) que veio junto com a rota
    const userId = route.params.user.id

    const fetchVagas = async () => {
        const result = await listarVagas()
        if (result.success) setVagas(result.vagas)
    }

    const handleOcupar = async (vagaId) => {
        const result = await ocuparVaga(vagaId, userId)
        Alert.alert(result.message)
        fetchVagas()
    }

    const handleDesocupar = async (vagaId) => {
        const result = await desocuparVaga(vagaId)
        Alert.alert(result.message)
        fetchVagas()
    }

    useEffect(() => { fetchVagas() }, [])

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text> Vaga #{item.id} - {item.preferencial_int ? 'Preferencial' : 'Comum'} </Text>
            <Text> Disponível: {item.disponivel ? 'Sim' : 'Não'} </Text>
            {item.disponivel ? (
                <Button title="Ocupar" onPress={() => handleOcupar(item.id)} />
            ) : (
                <Button title="Desocupar" onPress={() => handleDesocupar(item.id)} />
            )}
        </View>
    )

    return (
        <FlatList
            data={vagas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 20 }}
        />
    )
}

const styles = StyleSheet.create({
    card: {padding:15, borderWidth:1, borderRadius:8, marginBottom:10}
})