import React from "react";

function AboutUs() {
  return (
    <section
      className=" w-full flex items-center flex-col justify-center gap-4 about section "
      id="aboutus"
    >
      <h2 className="font-semibold">About me</h2>

      <div className="grid grid-cols-2 gap-4 w-9/12">
        <div className="about__data bd-grid">
          <div className="flex items-start justify-start flex-col gap-1">
            <span className="text-[1.6rem] font-semibold text-[#555]">
              Hello, I am <br />
            </span>
            <p className="about__description text-[#555] text-[1.1rem] font-medium">
              Arman Ali, a passionate and dedicated MERN stack developer with
              1.5 years of hands-on experience in building dynamic and
              responsive web applications. My journey in web development began
              with a fascination for creating user-friendly interfaces and
              scalable backend systems. Over time, I've honed my skills in
              MongoDB, Express.js, React.js, and Node.js, allowing me to develop
              full-stack applications that are both efficient and innovative.
            </p>
            <p className="about__description text-[#555] text-[1.1rem] font-medium">
              Throughout my career, I've had the opportunity to work on various
              projects that have challenged me to think creatively and push the
              boundaries of what's possible with web technology. My commitment
              to continuous learning and staying updated with the latest
              industry trends ensures that I am always at the forefront of
              modern web development practices.
            </p>
            <div className="flex gap-4 pt-3 w-full items-center">
              <div className="flex flex-col items-center justify-center gap-1 w-[50%]">
                <strong className=" text text-[1.2rem] font-semibold">
                  1.5
                </strong>
                <span className="about__achievement text-[#555]">
                  Years of Experience
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 w-[50%]">
                <strong className=" text text-[1.2rem] font-semibold">
                  10+
                </strong>
                <span className="about__achievement text-[#555]">
                  Projects Completed
                </span>
              </div>
            </div>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1579591919791-0e3737ae3808?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTMwMzY1NzZ8&ixlib=rb-4.0.3&q=85"
          alt=""
          className="about__img"
        />
      </div>
    </section>
  );
}

export default AboutUs;
