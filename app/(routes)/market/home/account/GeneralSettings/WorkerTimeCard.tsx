import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Platform,
    Alert,
} from 'react-native';
import DateTimePicker, {
    DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { scale } from 'react-native-size-matters';



const WorkerTimeCard = () => {
    const [startTime, setStartTime] = useState(new Date(2023, 0, 1, 9, 0));
    const [endTime, setEndTime] = useState(new Date(2023, 0, 1, 17, 0));
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const formatTime = (date: Date): string =>
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const calculateHours = (): string => {
        const diff = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        return diff > 0 ? `${diff.toFixed(1)} ساعات` : 'الرجاء اختيار وقت صحيح';
    };

    const handleStartChange = (
        event: DateTimePickerEvent,
        selectedTime?: Date
    ) => {
        setShowStartPicker(false);
        if (event.type === 'set' && selectedTime) {
            if (selectedTime >= endTime) {
                Alert.alert('⚠️ خطأ', 'وقت البداية يجب أن يكون قبل وقت النهاية');
            } else {
                setStartTime(selectedTime);
            }
        }
    };

    const handleEndChange = (
        event: DateTimePickerEvent,
        selectedTime?: Date
    ) => {
        setShowEndPicker(false);
        if (event.type === 'set' && selectedTime) {
            if (selectedTime <= startTime) {
                Alert.alert('⚠️ خطأ', 'وقت النهاية يجب أن يكون بعد وقت البداية');
            } else {
                setEndTime(selectedTime);
            }
        }
    };

    return (
        <View style={styles.card}>

            <View style={styles.timeRow}>
                <Text style={styles.buttonText}> من :  </Text>

                <DateTimePicker
                    value={startTime}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={handleStartChange}
                />
            </View>

            <View style={styles.timeRow}>

                <Text style={styles.buttonText}> الي :  </Text>

                <DateTimePicker
                    value={endTime}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={handleEndChange}
                />

            </View>



            <Text style={styles.hours}>⏱ عدد الساعات: {calculateHours()}</Text>





        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        width: '100%',
        height: '100%',
        padding: 20,
        margin: 0,

    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 16,
    },
    timeRow: {
        marginVertical: 10,
        flexDirection: 'row-reverse',
        gap: 10,
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#eef6ff',
        padding: 12,
        borderRadius: 10,
        minWidth: '45%',
    },
    buttonText: {
        fontSize: scale(16),
        lineHeight: scale(32),
        textAlign: 'center',
        fontWeight: '500',
        fontFamily: Platform.OS === 'ios' ? 'Almarai' : 'sans-serif',
    },
    hours: {
        marginTop: 5,
        fontSize: scale(16),
        lineHeight: scale(32),
        textAlign: 'center',
        fontWeight: '500',
        fontFamily: Platform.OS === 'ios' ? 'Almarai' : 'sans-serif',
    },
});

export default function App() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#f3f4f6' }}>
            <WorkerTimeCard />
        </View>
    );
}
