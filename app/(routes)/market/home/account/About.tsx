import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { s, scale } from 'react-native-size-matters'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { router } from 'expo-router'
import BgPattern from '@/assets/svg/Pattern'

const About = () => {
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={{ position: 'absolute', top: 0, opacity: 0.1 }}>
                <BgPattern />
            </View>
            {/* Header */}
            <View style={styles.pageTitle}>
                <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
                    <Icon name="chevron-back-outline" size={scale(24)} color="#333" />
                </TouchableOpacity>
                <Text style={styles.pageTitleText}>حول التطبيق</Text>
                <View style={styles.dummyView} />
            </View>


            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollcontent}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.content}>
                    1. مقدمة عن التطبيق
                    ما هو تطبيق "يومار"؟
                    "يومار" هو تطبيق سعودي جديد للتسوق وتوصيل الطلبات إلى المنازل، يهدف إلى توفير تجربة تسوق سريعة وموثوقة للمستخدمين في المملكة العربية السعودية.
                    يُتيح التطبيق طلب البقالة، الأطعمة، الأدوية، والمنتجات اليومية من متاجر محلية مع توصيلها خلال ساعات قليلة.
                    التميز: قد يركز على السرعة، الأسعار التنافسية، أو دعم المتاجر المحلية.
                    2. مميزات التطبيق
                    ✅ واجهة سهلة بتصميم بسيط يناسب جميع الفئات.✅ توصيل سريع مع إمكانية التتبع المباشر للطلبات.✅ تشكيلة متنوعة من المتاجر والموردين المحليين.✅ خصومات وعروض حصرية للمستخدمين.✅ دفع آمن عبر طرق متعددة (بطاقات، Apple Pay، مدى، تحويل بنكي).✅ دعم عملاء على مدار الساعة.
                    3. كيف يعمل التطبيق؟
                    تحميل التطبيق:
                    متاح على [App Store] و[Google Play] (تأكد من الرابط الرسمي).
                    تسجيل الدخول:
                    إنشاء حساب عبر رقم الجوال أو البريد الإلكتروني.
                    بدء التسوق:
                    تصفح المتاجر أو البحث عن منتجات محددة.
                    إتمام الطلب:
                    اختيار عنوان التوصيل وطريقة الدفع.
                    تتبع الطلب:
                    معرفة حالة الطلب (قيد التجهيز، التوصيل، etc.).
                    4. إيجابيات وسلبيات
                    الإيجابياتالسلبياتتوصيل سريع وموثوققد لا يكون متاحًا في جميع المدن السعودية (في البداية)أسعار تنافسيةرسوم توصيل مرتفعة في بعض الأحياندعم المتاجر المحليةعدد المتاجر محدود في الإطلاق الأولي
                    5. مقارنة مع تطبيقات مشابهة
                    مقارنة مع "نون" أو "تمارا":
                    "يومار" قد يركز على التوصيل الفوري بينما "نون" تشتهر بالتسوق الإلكتروني الشامل.
                    قد يكون أسرع في التوصيل من بعض المنافسين إذا اعتمد على مخازن محلية.
                    6. التقييم النهائي والنصائح
                    هل يستحق التجربة؟
                    نعم، إذا كان يقدم سرعة توصيل وجودة خدمة تنافسية.
                    نقاط للتحسين:
                    زيادة التغطية الجغرافية.
                    إضافة المزيد من المتاجر والمنتجات.
                    لماذا قد يكون "يومار" خيارًا جيدًا؟
                    إذا كنت تبحث عن تطبيق سعودي يركز على السرعة ويُعزز التجارة المحلية.
                    مناسب للأشخاص الذين يفضلون توصيل الطلبات اليومية بضغطة زر.
                    💡 نصيحة: جربه وشارك تجربتك في التقييمات لمساعدة الآخرين!
                    إذا كنت تريد معلومات أكثر دقة (مثل: الشركة المطورة، المناطق المتاحة، etc.)، يُمكنك زيارة موقعهم الرسمي أو صفحات التواصل الاجتماعي. 😊
                </Text>
            </ScrollView>

        </SafeAreaView>
    )
}

export default About

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: scale(24),
    },
    scrollView: {
        width: '100%',
    },
    scrollcontent: {
        alignItems: 'center',
    },
    pageTitle: {
        width: "100%",
        height: scale(40),
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: scale(10),
    },
    pageTitleText: {
        fontFamily: 'Almarai',
        fontSize: scale(16),
        fontWeight: 'bold',
    },
    iconButton: {
        backgroundColor: '#E5E5E5',
        borderRadius: scale(8),
        padding: scale(4),
        width: scale(36),
        height: scale(36),
        justifyContent: 'center',
        alignItems: 'center',
    },
    dummyView: {
        width: scale(36),
        height: scale(36),
    },
    content: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        fontWeight: '400',
        color: '#333',
        textAlign: 'right',
        lineHeight: scale(24),
        marginTop: scale(10),
        paddingBottom: scale(20),
    }
})