import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { router } from 'expo-router'
import BgPattern from '@/assets/svg/Pattern'
const PrivacyPolicy = () => {
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
                <Text style={styles.pageTitleText}>سياسة الخصوصية</Text>
                <View style={styles.dummyView} />
            </View>



            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollcontent}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.content}>
                    مرحبًا بكم في تطبيق "يومار" (يُشار إليه بـ "التطبيق" أو "الخدمة"). نحن نقدّر ثقتكم بنا ونلتزم بحماية خصوصيتكم وبياناتكم الشخصية. تشرح هذه السياسة كيفية جمعنا، استخدامنا، ومشاركة معلوماتكم عند استخدامكم لتطبيق "يومار".
                    1. المعلومات التي نجمعها
                    عند استخدامكم للتطبيق، قد نجمع الأنواع التالية من المعلومات:
                    أ. المعلومات المقدمة من قبلكم
                    البيانات الشخصية: مثل الاسم الكامل، رقم الجوال البريد الإلكتروني، والعنوان.
                    بيانات الدفع: معلومات بطاقة الائتمان أو الحساب البنكي (يتم التعامل معها عبر بوابات دفع آمنة).
                    تفضيلات التسوق: مثل سجل الطلبات والعناوين المحفوظة.
                    ب. المعلومات المجمعة تلقائيًا
                    بيانات الجهاز: نوع الجهاز، نظام التشغيل، وعنوان IP.
                    بيانات الاستخدام: الصفحات التي تزورها، وقت الجلسة، والتفاعلات داخل التطبيق.
                    الموقع الجغرافي: إذا سمحتم بذلك، لجعل عملية التوصيل أكثر دقة.
                    2. كيف نستخدم معلوماتكم؟
                    نستخدم البيانات لأغراض تشمل:✔️ توفير الخدمة (معالجة الطلبات، التوصيل، والدعم الفني).✔️ تحسين التطبيق بناءً على ملاحظات المستخدمين.✔️ إرسال عروض ترويجية مخصصة (إذا وافقتم على ذلك).✔️ الأمان لمنع الاحتيال أو الاستخدام غير المصرح به.
                    3. مشاركة البيانات مع أطراف ثالثة
                    لا نبيع بياناتكم الشخصية، ولكن قد نشاركها مع:
                    شركات التوصيل لإتمام الطلبات.
                    مقدمي خدمات الدفع لمعالجة المعاملات.
                    الجهات الحكومية إذا تطلب القانون ذلك.
                    4. حماية البيانات
                    نستخدم تقنيات تشفير (مثل SSL) لحماية بياناتكم.
                    نلتزم بمعايير الأمان المتعارف عليها في المملكة العربية السعودية.
                    5. حقوقكم
                    لديكم الحق في:
                    الوصول إلى بياناتكم أو تصحيحها.
                    حذف حسابكم أو وقف التواصل التسويقي.
                    رفض تتبع الموقع عبر إعدادات الجهاز.
                    6. التغييرات على السياسة
                    قد نحدّث هذه السياسة بين الحين والآخر. وسنخطركم عبر التطبيق أو البريد الإلكتروني في حال وجود تغييرات جوهرية.


                    ملاحظة: هذه السياسة تخضع لقوانين المملكة العربية السعودية، بما في ذلك نظام حماية البيانات الشخصية (إذا كان ساريًا). يُنصح باستشارة خبير قانوني لضمان الامتثال الكامل.
                    باستخدامكم تطبيق "يومار"، فإنكم توافقون على شروط هذه السياسة. شكرًا لاختياركم "يومار"! 🛒🚚
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PrivacyPolicy

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