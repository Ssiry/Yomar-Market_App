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

type WorkerTimeCardProps = {
    name: string;
};

const WorkerTimeCard = ({ name }: WorkerTimeCardProps) => {
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
            <Text style={styles.name}>👷 العامل: {name}</Text>

            <View style={styles.timeRow}>
                <Pressable onPress={() => setShowStartPicker(true)} style={styles.button}>
                    <Text style={styles.buttonText}>🟢 من: {formatTime(startTime)}</Text>
                </Pressable>

                <Pressable onPress={() => setShowEndPicker(true)} style={styles.button}>
                    <Text style={styles.buttonText}>🔴 إلى: {formatTime(endTime)}</Text>
                </Pressable>
            </View>

            <Text style={styles.hours}>⏱ عدد الساعات: {calculateHours()}</Text>

            {showStartPicker && (
                <DateTimePicker
                    value={startTime}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={handleStartChange}
                />
            )}

            {showEndPicker && (
                <DateTimePicker
                    value={endTime}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={handleEndChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        padding: 20,
        margin: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#e6e6e6',
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 16,
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#eef6ff',
        padding: 12,
        borderRadius: 10,
        minWidth: '45%',
    },
    buttonText: {
        fontSize: 16,
        color: '#0057d9',
        textAlign: 'center',
    },
    hours: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: '500',
        color: '#444',
        textAlign: 'center',
    },
});

export default function App() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#f3f4f6' }}>
            <WorkerTimeCard name="أحمد علي" />
        </View>
    );
}
