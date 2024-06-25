"use client";
import Image from "next/image";
import homeimg from "../../public/Asset/images/Frame.png";
import Html from "../../public/Asset/images/icons8-html-logo-480.png";
import Css from "../../public/Asset/images/icons8-css-logo-400.png";
import Javascript from "../../public/Asset/images/icons8-javascript-480.png";
import Typescript from "../../public/Asset/images/icons8-typescript-480.png";
import Nodejs from "../../public/Asset/images/icons8-node-js-240.png";
import TailWind from "../../public/Asset/images/icons8-tailwind-css-400.png";
import React from "../../public/Asset/images/icons8-react-400.png";
import NextJs from "../../public/Asset/images/next-js.svg";

import Link from "next/link";
import { GitHub, LinkedIn } from "@mui/icons-material";

function Hero() {
  return (
    <section
      className="hero w-full flex items-center flex-col justify-center gap-20 py-4 h-screen"
      id="home"
    >
      <div className="hero_div flex flex-col">
        <div className="hero_top ">
          <div className="hero_top_text">
            <h1>Full-Stack Mern Developer</h1>
            <p>
              Hi, I'm Arman Ali. A passionate Full-Stack Mern Developer based in
              Lucknow, India. 📍
            </p>
            <span className="flex gap-2">
              <Link href="#">
                <LinkedIn style={{ fontSize: "2.5rem" }} />
              </Link>
              <Link href="#">
                <GitHub style={{ fontSize: "2.5rem" }} />
              </Link>
            </span>
          </div>
          <div className="hero_top_image">
            <Image src={homeimg} width={500} height={400} />
          </div>
        </div>
        <div className="hero_bottom flex items-center">
          <p className="pr-6 mr-3 ">Tech Stack</p>
          <span>
            <ul className="flex items-center gap-2">
              <li>
                <Image
                  src={Html}
                  width={70}
                  height={50}
                  className="rounded-sm"
                />
              </li>
              <li>
                <Image
                  src={Css}
                  width={70}
                  height={50}
                  className="rounded-sm"
                />
              </li>
              <li>
                <Image
                  src={TailWind}
                  width={70}
                  height={50}
                  className="rounded-sm"
                />
              </li>
              <li>
                <Image
                  src={Javascript}
                  width={70}
                  height={50}
                  className="rounded-sm"
                />
              </li>
              <li>
                <Image
                  src={Typescript}
                  width={70}
                  height={50}
                  className="rounded-sm"
                />
              </li>
              <li>
                <Image
                  src={Nodejs}
                  width={70}
                  height={50}
                  className="rounded-sm"
                />
              </li>
              <li>
                <Image
                  src={React}
                  width={70}
                  height={50}
                  className="rounded-sm"
                />
              </li>
              <li>
                <Image
                  src={NextJs}
                  width={65}
                  height={45}
                  className="rounded-sm"
                />
              </li>
            </ul>
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
