import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Platform,
    Alert,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { scale } from 'react-native-size-matters';

const weekDays = [
    'الجمعة',
    'الخميس',
    'الأربعاء',
    'الثلاثاء',
    'الاثنين',
    'الأحد',
    'السبت',
];

const WorkerWeeklyTime = () => {
    const [startTime, setStartTime] = useState(new Date(2023, 0, 1, 9, 0));
    const [endTime, setEndTime] = useState(new Date(2023, 0, 1, 17, 0));
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const [startDayIndex, setStartDayIndex] = useState(0);
    const [endDayIndex, setEndDayIndex] = useState(6);

    const formatTime = (date: Date): string =>
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const calculateHours = (): string => {
        const diff = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        return diff > 0 ? `${diff.toFixed(1)} ساعات` : 'الرجاء اختيار وقت صحيح';
    };

    const handleStartChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
        setShowStartPicker(false);
        if (event.type === 'set' && selectedTime) {
            if (selectedTime >= endTime) {
                Alert.alert('⚠️ خطأ', 'وقت البداية يجب أن يكون قبل وقت النهاية');
            } else {
                setStartTime(selectedTime);
            }
        }
    };

    const handleEndChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
        setShowEndPicker(false);
        if (event.type === 'set' && selectedTime) {
            if (selectedTime <= startTime) {
                Alert.alert('⚠️ خطأ', 'وقت النهاية يجب أن يكون بعد وقت البداية');
            } else {
                setEndTime(selectedTime);
            }
        }
    };

    const getSelectedDays = () => {
        if (startDayIndex > endDayIndex) return [];
        return weekDays.slice(startDayIndex, endDayIndex + 1);
    };

    return (
        <View style={styles.card}>
            {/* أوقات العمل
            <View style={styles.timeRow}>
                <Text style={styles.label}>من الساعة:</Text>
                <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.button}>
                    <Text style={styles.buttonText}>{formatTime(startTime)}</Text>
                </TouchableOpacity>
                {showStartPicker && (
                    <DateTimePicker
                        value={startTime}
                        mode="time"
                        is24Hour={false}
                        display="default"
                        onChange={handleStartChange}
                    />
                )}
            </View>

            <View style={styles.timeRow}>
                <Text style={styles.label}>إلى الساعة:</Text>
                <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.button}>
                    <Text style={styles.buttonText}>{formatTime(endTime)}</Text>
                </TouchableOpacity>
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

            <Text style={styles.hours}>⏱ عدد الساعات: {calculateHours()}</Text> */}

            {/* تحديد أيام العمل */}
            <View style={styles.dayPickerRow}>
                <Text style={styles.label}>يبدأ العمل من:</Text>
                <FlatList
                    data={weekDays}
                    horizontal
                    contentContainerStyle={styles.daysList}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => setStartDayIndex(index)}
                            style={[
                                styles.dayOption,
                                startDayIndex === index && styles.selectedDay,
                            ]}
                        >
                            <Text style={[styles.dayText
                                , startDayIndex === index && { color: '#fff' }
                            ]}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

            <View style={styles.dayPickerRow}>
                <Text style={styles.label}>وينتهي في:</Text>
                <FlatList
                    data={weekDays}
                    horizontal
                    contentContainerStyle={styles.daysList}
                    showsHorizontalScrollIndicator={false}

                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => setEndDayIndex(index)}
                            style={[
                                styles.dayOption,
                                endDayIndex === index && styles.selectedDay,
                            ]}
                        >
                            <Text style={[styles.dayText
                                , endDayIndex === index && { color: '#fff' }
                            ]}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

            {/* عرض الأيام المختارة */}
            <Text style={styles.selectedLabel}>أيام العمل:</Text>
            <View style={styles.selectedDaysContainer}>
                {getSelectedDays().map((day, index) => (
                    <View key={index} style={styles.selectedDayItem}>
                        <Text style={styles.selectedDayText}>{day}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#ffffff',
        // padding: 20,
    },
    label: {
        fontSize: scale(16),
        fontFamily: Platform.OS === 'ios' ? 'Almarai' : 'sans-serif',
        color: '#333',
        marginBottom: scale(5),
        width: '100%',
        textAlign: 'right',
        fontWeight: '500',
    },
    timeRow: {
        marginBottom: scale(16),
    },
    button: {
        backgroundColor: '#e0f0f0',
        paddingVertical: scale(8),
        paddingHorizontal: scale(16),
        borderRadius: scale(8),
        alignSelf: 'flex-start',
    },
    buttonText: {
        fontSize: scale(16),
        color: '#036E65',
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Almarai' : 'sans-serif',
    },
    hours: {
        marginBottom: scale(24),
        fontSize: scale(16),
        textAlign: 'center',
        fontWeight: '500',
        color: '#444',
    },
    dayPickerRow: {
        marginBottom: scale(16),
    },
    daysList: {
        gap: scale(10),
        marginTop: scale(8),
        alignItems: 'flex-end',

    },
    dayOption: {
        paddingVertical: scale(8),
        paddingHorizontal: scale(12),
        borderRadius: scale(6),
        borderWidth: scale(1),
        borderColor: '#ccc',
        backgroundColor: '#f6f6f6',
    },
    selectedDay: {
        backgroundColor: '#036E65',
        borderColor: '#036E65',

    },
    dayText: {
        color: '#333',
        fontFamily: Platform.OS === 'ios' ? 'Almarai' : 'sans-serif',
        lineHeight: scale(20),
    },
    selectedLabel: {
        fontSize: scale(14),
        fontWeight: '600',
        marginTop: scale(10),
        fontFamily: Platform.OS === 'ios' ? 'Almarai' : 'sans-serif',
        width: '100%',
        textAlign: 'right',

        marginBottom: scale(6),
        color: '#555',
    },
    selectedDaysContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: scale(8),
    },
    selectedDayItem: {
        backgroundColor: '#e6f0ee',
        borderRadius: scale(8),
        paddingVertical: scale(4),
        paddingHorizontal: scale(10),
    },
    selectedDayText: {
        fontFamily: Platform.OS === 'ios' ? 'Almarai' : 'sans-serif',
        lineHeight: scale(20),
        fontSize: scale(14),
        color: '#036E65',
    },
});

export default function App() {
    return (
        <View style={{ flex: 1, }}>
            <WorkerWeeklyTime />
        </View>
    );
}
