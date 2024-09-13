import { BoxProps } from "@chakra-ui/react";
import { ReactElement } from "react";

export interface ServiceImage {
    src: string;
    alt: string;
    width: string;
    height: string;
}

export interface ServiceData {
    text: string | ReactElement;
    images: ServiceImage[];
}

export interface Services {
    transformValues: number[][];

    mobileTransformValues: number[][];
    data: ServiceData[];
}
