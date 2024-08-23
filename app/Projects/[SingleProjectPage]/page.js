import Gallery from "@components/Gallery/Gallery";
import gallery from "../../../public/Asset/images/about.webp";
import gallery1 from "../../../public/Asset/images/about.webp";
import gallery2 from "../../../public/Asset/images/about.webp";
import gallery3 from "../../../public/Asset/images/about.webp";
import gallery4 from "../../../public/Asset/images/about.webp";
import gallery5 from "../../../public/Asset/images/about.webp";
import gallery6 from "../../../public/Asset/images/about.webp";
import gallery7 from "../../../public/Asset/images/about.webp";
import gallery8 from "../../../public/Asset/images/about.webp";
import poster from "../../../public/Asset/video/3048179-uhd_2560_1440_24fps-0.jpg";
export default function SingleProjectPage({ params }) {
  const { slug } = params;
  const itemData = [
    { img: gallery },
    { img: gallery1 },
    { img: gallery2 },
    { img: gallery3 },
    { img: gallery4 },
    { img: gallery5 },
    { img: gallery6 },
    { img: gallery7 },
    { img: gallery8 },
  ];
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between gap-4 my-4">
      <div className="w-11/12 flex items-start justify-start flex-col gap-2">
        <h2 className="font-semibold text-mainHeading">
          This is Title Of Project
        </h2>
        <p className="text-secndryHeading font-semibold">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <div className="w-11/12 flex items-start justify-start flex-col gap-2">
        <video
          autoPlay={true}
          loop
          muted
          poster={poster}
          className="w-full h-full rounded-md"
        >
          <source
            src="/Asset/video/3048179-uhd_2560_1440_24fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="w-11/12 flex items-start justify-start flex-col gap-1">
        <h6 className="text-normalHeading font-semibold text-mainHeading">
          Project Overview
        </h6>
        <span>
          <h6 className="text-para font-semibold">Introduction:</h6>
          <p className="text-secndryHeading font-semibold text-para">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </span>
        <span>
          <h6 className="text-para font-semibold"> Key Features:</h6>
          <p className="text-secndryHeading font-semibold">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>{" "}
        </span>
        <span>
          <h6 className="text-para font-semibold"> Technologies Used:</h6>
          <p className="text-secndryHeading font-semibold">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </span>
      </div>
      <div className="w-11/12 flex items-start justify-start flex-col gap-2">
        <h6 className="text-normalHeading font-semibold text-mainHeading">
          Detailed Description
        </h6>
        <span>
          <h6 className="text-para font-semibold"> Problem Statement:</h6>
          <p className="text-secndryHeading font-semibold">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </span>
        <span>
          <h6 className="text-para font-semibold"> Solution:</h6>
          <p className="text-secndryHeading font-semibold">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>{" "}
        </span>
        <span>
          <h6 className="text-para font-semibold"> Development Process:</h6>
          <p className="text-secndryHeading font-semibold">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </span>
      </div>
      <div className="w-11/12 flex items-start justify-start flex-col gap-2">
        <h6 className="text-normalHeading font-semibold">Gallery</h6>
        <Gallery itemData={itemData} />
      </div>
      <div className="w-11/12 flex items-start justify-start flex-col gap-2">
        <button class="cta-button">Get in Touch</button>
      </div>
    </main>
  );
}
