import { Box, Text } from "@chakra-ui/react";

import serv1 from "../assets/salam/1.png";
import serv10 from "../assets/salam/10.png";
import serv11 from "../assets/salam/11.png";
import serv12 from "../assets/salam/12.png";
import serv13 from "../assets/salam/13.png";
import serv14 from "../assets/salam/14.png";
import serv15 from "../assets/salam/15.png";
import serv2 from "../assets/salam/2.png";
import serv3 from "../assets/salam/3.png";
import serv4 from "../assets/salam/4.png";
import serv5 from "../assets/salam/5.png";
import serv6 from "../assets/salam/6.png";
import serv7 from "../assets/salam/7.png";
import serv8 from "../assets/salam/8.png";
import serv9 from "../assets/salam/9.png";
// import serv16 from "../assets/salam/16.jpg";
// import serv17 from "../assets/salam/17.jpg";
// import serv18 from "../assets/salam/18.jpg";

import { Link } from "react-router-dom";
import paperTextureImage from "../assets/paper-texture.png";
import { Services } from "../types/servicesTypes";
import HomeServiceSection from "./HomeServiceSection";

const services: Services = {
  transformValues: [
    [-20, 40],
    [-120, -40],
    [-60, -80],
  ],

  mobileTransformValues: [
    [0, 70],
    [0, 30],
    [0, 80],
  ],
  data: [
    {
      text: "نشر الوعي حول السلام و العمل الإنساني",
      images: [
        { src: serv1, alt: "Service 1", width: "18vw", height: "18vw" },
        { src: serv2, alt: "Service 2", width: "20vw", height: "20vw" },
        { src: serv3, alt: "Service 3", width: "20vw", height: "20vw" },
      ],
    },
    {
      text: "تكوين و تطوير معارف و اتجاهات و مهارات الأفراد و المؤسسات بمجالات عدة من خلال نهج لا عنفي",
      images: [
        { src: serv4, alt: "Service 1", width: "18vw", height: "18vw" },
        { src: serv5, alt: "Service 2", width: "20vw", height: "20vw" },
        { src: serv6, alt: "Service 3", width: "20vw", height: "20vw" },
      ],
    },
    {
      text: (
        <Box>
          <Text mb={5}>
            مشروع "حكايا سلام" {<br />} هدفه تشكيل فريق من صناع التغيير و
            السلام, ليساهموا في رفع الوعي إلى الإيجابيات في مجتمعنا السوري.{" "}
            {<br />} والمساعدة في تدوين و نقل قصص التعاطف والسلام و العيش
            المشترك.
          </Text>
          <Link to={"/salam"}>
            <Text decoration={"underline"} color={"secondary.500"}>
              المزيد
            </Text>
          </Link>
        </Box>
      ),
      images: [
        { src: serv7, alt: "Service 1", width: "18vw", height: "18vw" },
        { src: serv8, alt: "Service 2", width: "20vw", height: "20vw" },
        { src: serv9, alt: "Service 3", width: "20vw", height: "20vw" },
      ],
    },
    {
      text: "تقديم استشارات فردية و جماعية, نفسية-اجتماعية من قبل مختصين لمساعدة الأفراد للوصول إلى مستوى من الرضى و الصحة النفسية",
      images: [
        { src: serv10, alt: "Service 1", width: "18vw", height: "18vw" },
        { src: serv11, alt: "Service 2", width: "20vw", height: "20vw" },
        { src: serv12, alt: "Service 3", width: "20vw", height: "20vw" },
      ],
    },
    {
      text: "العمل على تشكيل و تمكين حاضنات سلام لتوفير بيئة امنة بما يساهم في خفض العنف.",
      images: [
        { src: serv13, alt: "Service 1", width: "18vw", height: "18vw" },
        { src: serv14, alt: "Service 2", width: "20vw", height: "20vw" },
        { src: serv15, alt: "Service 3", width: "20vw", height: "20vw" },
      ],
    },
  ],
};

const HomeServiceGrid = () => {
  return (
    <Box
      backgroundColor={"secondary.500"}
      backgroundImage={`url(${paperTextureImage})`}
      backgroundRepeat={"repeat-y"}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
    >
      {services.data.map((service, index) => (
        <HomeServiceSection
          key={index}
          service={service}
          transformValues={services.transformValues}
          mobileTransformValues={services.mobileTransformValues}
          index={index}
        />
      ))}
    </Box>
  );
};

export default HomeServiceGrid;
