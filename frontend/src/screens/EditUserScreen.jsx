import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { editarUsuario } from '../services/api';
export default function EditUserScreen() {
 const route = useRoute();
 const navigation = useNavigation();
 const { user } = route.params;
 const [form, setForm] = useState({
   username: '',
   email: '',
   password: '',
   placa: '',
   cor: '',
   modelo: ''
 });
 useEffect(() => {
   if (user) {
     setForm({
       username: user.username || '',
       email: user.email || '',
       password: '', 
       placa: user.placa || '',
       cor: user.cor || '',
       modelo: user.modelo || ''
     });
   }
 }, [user]);
 const handleChange = (field, value) => {
   setForm({ ...form, [field]: value });
 };
 const handleSave = async () => {
   const result = await editarUsuario(user.id, form);
   if (result.success) {
     Alert.alert('Sucesso', result.message);
     navigation.goBack(); 
   } else {
     Alert.alert(
   'Erro', result.message || 'Erro ao atualizar os dados.');
   }
 };
 return (
<View style={styles.container}>
<TextInput placeholder="Nome de usuário" value={form.username} onChangeText={(value) => handleChange('username', value)} style={styles.input}/>
<TextInput placeholder="E-mail" value={form.email} onChangeText={(value) => handleChange('email', value)} style={styles.input}/>
<TextInput placeholder="Senha (opcional)"  value={form.password}  secureTextEntry onChangeText={(value) => handleChange('password', value)} style={styles.input}/>
<TextInput placeholder="Placa do veículo" value={form.placa} onChangeText={(value) => handleChange('placa', value)} style={styles.input}/>
<TextInput placeholder="Cor do veículo" value={form.cor} onChangeText={(value) => handleChange('cor', value)} style={styles.input}/>
<TextInput placeholder="Modelo do veículo" value={form.modelo} onChangeText={(value) => handleChange('modelo', value)}  style={styles.input}/>
<Button title="Salvar" onPress={handleSave}/>
</View>
 );
}
const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   padding: 20,
   backgroundColor: '#f5f5f5'
 },
 input: {
   borderWidth: 1,
   borderColor: '#ccc',
   marginBottom: 12,
   padding: 12,
   borderRadius: 8,
   backgroundColor: '#fff',
   fontSize: 16
 }
});