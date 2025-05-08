import * as React from "react";
import { scale } from "react-native-size-matters";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const Note = (props: any) => (
    <Svg
        width={scale(50)}
        height={scale(50)}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#clip0_354_30101)">
            <Path
                d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
                fill="#008C81"
            />
            <Path
                d="M50.0002 25C50.0002 24.7028 49.9932 24.4074 49.9828 24.1128L40.8251 14.9551L11.1113 38.8889L22.048 49.8256C23.0163 49.9396 24.0012 50 25.0002 50C38.8072 50 50.0002 38.807 50.0002 25Z"
                fill="#036E65"
            />
            <Path
                d="M36.9813 11.1111H22.2227V30.5555H41.6671V15.7967L36.9813 11.1111Z"
                fill="#D5C8C8"
            />
            <Path
                d="M41.6665 15.7967L36.9808 11.1111H30.9482V30.5555H41.6665V15.7967Z"
                fill="white"
            />
            <Path
                d="M36.9805 15.7967H41.6662L36.9805 11.1111V15.7967Z"
                fill="white"
            />
            <Path
                d="M25.87 19.4445H11.1113V38.8889H30.5558V24.1302L25.87 19.4445Z"
                fill="#FFC61B"
            />
            <Path
                d="M30.5553 24.1302L25.8695 19.4445H20.0615V38.8889H30.5553V24.1302Z"
                fill="#D48B07"
            />
            <Path
                d="M25.8701 24.1302H30.5559L25.8701 19.4445V24.1302Z"
                fill="#FEE187"
            />
            <Path
                d="M27.7775 26.1364H13.8887V27.1464H27.7775V26.1364Z"
                fill="#121149"
            />
            <Path
                d="M27.7775 33.6279H13.8887V34.638H27.7775V33.6279Z"
                fill="#121149"
            />
            <Path
                d="M27.7775 29.8821H13.8887V30.8921H27.7775V29.8821Z"
                fill="#121149"
            />
        </G>
        <Defs>
            <ClipPath id="clip0_354_30101">
                <Rect width={50} height={50} fill="white" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default Note;
