import OnBoarding1 from "@/assets/svg/Onboarding1";
import OnBoarding2 from "@/assets/svg/Onboarding2";
import OnBoarding3 from "@/assets/svg/Onboarding3";

export const OnBoardingData: OnBoardingDataType[] = [

    {
        id: "1",
        title: 'كل منتجاتك في مكان واحد',
        subtitle: 'أضف المنتجات، نظّمها داخل أقسام، وحدّث الكمية أو السعر بكل سهولة.',
        image: <OnBoarding1 />
    },
    {
        id: "2",
        title: 'تابع الطلبات لحظة بلحظة',
        subtitle: 'استقبل الطلبات، وافق عليها، وخلي الكباتن يوصلوها بأسرع وقت',
        image: <OnBoarding2 />
    },
    {
        id: "3",
        title: 'تحكم كامل في الكباتن',
        subtitle: 'أضف كباتن، احذف أو عطّل حساباتهم، وتابع حالة التوصيل مباشرة.',
        image: <OnBoarding3 />
    },


];