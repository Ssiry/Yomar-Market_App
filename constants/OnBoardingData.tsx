import OnBoarding1 from "@/assets/svg/Onboarding1";
import OnBoarding2 from "@/assets/svg/Onboarding2";
import OnBoarding3 from "@/assets/svg/Onboarding3";

import Onboarding4 from "@/assets/svg/Onboarding4";
import Onboarding5 from "@/assets/svg/Onboarding5";
import Onboarding6 from "@/assets/svg/Onboarding6";

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

export const OnBoardingDeliveryData: OnBoardingDataType[] = [

    {
        id: "1",
        title: 'استلم الطلبات بسهولة',
        subtitle: 'توصلك الطلبات المتاحة من السوق، وتقدر تقبلها بضغطة وحدة',
        image: <Onboarding4 />
    },
    {
        id: "2",
        title: 'وجّهتك واضحة',
        subtitle: 'نوفّرلك عنوان العميل مع تفاصيله، وانت تركّز على التوصيل فقط.',
        image: <Onboarding5 />
    },
    {
        id: "3",
        title: 'سهولة في التحديث',
        subtitle: 'كل طلب تقدر تحدّث حالته(تم الاستلام، تم التوصيل) بخطوة بسيطة.',
        image: <Onboarding6 />
    },


];