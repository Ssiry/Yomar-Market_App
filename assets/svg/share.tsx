import * as React from "react";
import { scale } from "react-native-size-matters";
import Svg, { G, Rect, Path, Defs, ClipPath } from "react-native-svg";

const Share = (props: any) => (
    <Svg
        width={scale(49)}
        height={scale(49)}
        viewBox="0 0 49 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#clip0_136_7805)">
            <Rect width={49} height={49} rx={24.5} fill="white" />
            <Rect
                x={1.02083}
                y={1.02083}
                width={46.9583}
                height={46.9583}
                rx={23.4792}
                stroke="#036E65"
                strokeWidth={2.04167}
            />
            <Path
                d="M17.8171 26.5553L27.1135 31.9725M27.0999 17.0275L17.8171 22.4447M34.7085 14.9722C34.7085 17.2274 32.8803 19.0556 30.6252 19.0556C28.37 19.0556 26.5418 17.2274 26.5418 14.9722C26.5418 12.7171 28.37 10.8889 30.6252 10.8889C32.8803 10.8889 34.7085 12.7171 34.7085 14.9722ZM18.3752 24.5C18.3752 26.7552 16.547 28.5834 14.2918 28.5834C12.0367 28.5834 10.2085 26.7552 10.2085 24.5C10.2085 22.2449 12.0367 20.4167 14.2918 20.4167C16.547 20.4167 18.3752 22.2449 18.3752 24.5ZM34.7085 34.0278C34.7085 36.283 32.8803 38.1111 30.6252 38.1111C28.37 38.1111 26.5418 36.283 26.5418 34.0278C26.5418 31.7726 28.37 29.9445 30.6252 29.9445C32.8803 29.9445 34.7085 31.7726 34.7085 34.0278Z"
                stroke="#036E65"
                strokeWidth={2.72222}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </G>
        <Rect
            x={1.5}
            y={1.5}
            width={46}
            height={46}
            rx={23}
            stroke="#036E65"
            strokeWidth={3}
        />
        <Defs>
            <ClipPath id="clip0_136_7805">
                <Rect width={49} height={49} rx={24.5} fill="white" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default Share;
