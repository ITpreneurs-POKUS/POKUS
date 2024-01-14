import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import updateNote from './updateNote';

export default async function SaveNote(note, navigation){
    async function getKey(){
        const note = await AsyncStorage.getItem('0')
        if(note === null){
            await AsyncStorage.setItem('0','1');
            return 1;
        }else{
            const key = String(Number(note) + 1);
            await AsyncStorage.setItem('0',key);
            return key;
        }
    }

    if(note.note === '' || note.title === ''){
        Alert.alert(
            'ERROR',
            'There is an error!',
            [
                {
                    text:'OK',
                    style:'cancel'
                }
            ]
        )
    }else{
        try{
            let data = [];
            if(note.id){
                if(Array.isArray(JSON.parse(await AsyncStorage.getItem('todoNotes')))){
                    data = JSON.parse(await AsyncStorage.getItem('todoNotes'));
                }else{
                    data.push(JSON.parse(await AsyncStorage.getItem('todoNotes')));
                }
                data = updateNote(data,note);
                await AsyncStorage.setItem('todoNotes',JSON.stringify(data));
            }else{
                note.id=(await getKey())
                if(await AsyncStorage.getItem('todoNotes')==null){
                    await AsyncStorage.setItem('todoNotes',JSON.stringify(note));
                }else{
                    if(Array.isArray(JSON.parse(await AsyncStorage.getItem('todoNotes')))){
                        data = JSON.parse(await AsyncStorage.getItem('todoNotes'));
                    }else{
                        data.push(JSON.parse(await AsyncStorage.getItem('todoNotes')));
                    }
                    data.push(note);
                    await AsyncStorage.setItem('todoNotes',JSON.stringify(data));
                }
            }
            navigation.goBack();
        }catch(err){
            console.log(err);
            Alert.alert(
                'ERROR',
                'Enter Some Info before Saving.',
                [
                    {
                        text:'OK',
                        style:'cancel'
                    }
                ]
            )
        }
    }
}