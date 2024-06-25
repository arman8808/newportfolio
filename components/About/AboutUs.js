import React from "react";

function AboutUs() {
  return (
    <section
      className=" w-full flex items-center flex-col justify-center gap-20 about section bd-container"
      id="aboutus"
    >
      <h2 className="font-semibold">About me</h2>

      <div className="about__container bd-grid">
        <div className="about__data bd-grid">
          <div className="flex items-start justify-start flex-col gap-1">
            <span className="text-[1.6rem] font-semibold text-[#555]">
              Hello, I am <br />
            </span>
            <p className="about__description text-[#555] text-[1.1rem] font-medium">
              Freelance frontend developer, I am passionate about creating and
              developing web interfaces. With years of experience in web design
              and development.
            </p>
            <div className="flex gap-4 pt-3 w-full items-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <strong className=" text text-[1.2rem] font-semibold">
                  1.5
                </strong>
                <span className="about__achievement">Years of Experience</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <span className=" text text-[1.2rem] font-semibold">10+</span>
                <span className="about__achievement">Projects Completed</span>
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
