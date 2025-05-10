import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { router } from 'expo-router'
import BgPattern from '@/assets/svg/Pattern'
const TermesAndCondetions = () => {
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
                    مرحبًا بكم في تطبيق "يومار" (يُشار إليه بـ "التطبيق" أو "الخدمة"). يُرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام التطبيق. باستخدامكم "يومار"، فإنكم توافقون على الالتزام بهذه الشروط. إذا لم توافقوا عليها، يُرجى عدم استخدام التطبيق.
                    1. القبول بالشروط
                    يُشترط أن يكون عمر المستخدم 18 عامًا فأكثر، أو أن يتم استخدام التطبيق تحت إشراف ولي أمر.
                    يحق لـ "يومار" رفض الخدمة لأي مستخدم يخالف هذه الشروط.
                    2. إنشاء الحساب
                    يجب تقديم معلومات دقيقة عند التسجيل (مثل الاسم، رقم الهاتف، والعنوان).
                    أنتم مسؤولون عن حماية كلمة المرور، وسيتم تحميلكم المسؤولية عن أي نشاط غير مصرح به تحت حسابكم.
                    يحق لنا تعليق الحساب أو إغلاقه إذا انتهكتم الشروط.
                    3. الطلبات والتوصيل
                    الأسعار والعروض قابلة للتغيير دون إشعار مسبق.
                    قد تختلف توفر المنتجات حسب المتجر والمكان.
                    أوقات التوصيل تقديرية وقد تتأثر بعوامل خارجية (مثل الزحام، الطقس، etc.).
                    يُمكن رفض الطلبات غير المتوفرة أو التي تنتهك سياساتنا (مثل المواد المحظورة).
                    4. الدفع والمبالغ المستردة
                    نستخدم أنظمة دفع آمنة، لكننا غير مسؤولين عن أخطاء البنوك أو أنظمة الدفع الخارجية.
                    الإلغاء بعد التوصيل: لا يُمكن استرداد المبلغ إلا في حالات محددة (مثل تلف المنتج).
                    الدفع عند الاستلام: يجب التأكد من صحة المبلغ قبل التسليم.
                    5. سياسة الإرجاع والاستبدال
                    يُمكن إرجاع المنتجات غير الصالحة أو التالفة خلال [24-48 ساعة] من الاستلام.
                    يجب تقديم إثبات الشراء (مثل الفاتورة) لمعالجة الطلب.
                    بعض المنتجات غير قابلة للإرجاع (مثل المواد الغذائية الطازجة).
                    6. سلوك المستخدم والمحتوى
                    يُمنع استخدام التطبيق لأغراض:
                    غير قانونية (مثل الاحتيال، التهديد، etc.).
                    إساءة البائعين أو مندوبي التوصيل.
                    انتهاك حقوق الملكية الفكرية.
                    يحق لنا حظر الحساب فورًا في حال المخالفة.
                    7. مسؤولية "يومار"
                    نحن غير مسؤولين عن:
                    أي أضرار ناتجة عن سوء استخدام التطبيق.
                    تأخير التوصيل بسبب ظروف خارجة عن إرادتنا.
                    جودة المنتجات المقدمة من المتاجر الخارجية.
                    8. التعديلات على الشروط
                    قد نحدث هذه الشروط بين الحين والآخر، وسيتم إعلامكم عبر التطبيق أو البريد الإلكتروني.
                    9. القانون الحاكم
                    تخضع هذه الشروط لقوانين المملكة العربية السعودية، وأي نزاعات سيتم حلها عبر المحاكم السعودية.
                </Text>


            </ScrollView>
        </SafeAreaView>
    )
}

export default TermesAndCondetions

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
});