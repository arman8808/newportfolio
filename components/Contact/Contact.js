import Link from "next/link";
import React from "react";

function Contact() {
  return (
    <section
      className="contact flex items-center justify-center pb-4"
      id="contact"
    >
      <div className="flex items-start justify-center flex-col gap-2">
        <p>CONTACT</p>
        <h3>Don't be shy! Hit me up! 👇</h3>
        <div className="contact_info flex items-center mobile:flex-col mt-3 mobile:justify-start mobile:items-start">
          <div className="flex items-center gap-4 w-full">
            <span className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="tabler-icon tabler-icon-map-search"
              >
                <path d="M11 18l-2 -1l-6 3v-13l6 -3l6 3l6 -3v7.5"></path>
                <path d="M9 4v13"></path>
                <path d="M15 7v5"></path>
                <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path d="M20.2 20.2l1.8 1.8"></path>
              </svg>
            </span>
            <div className="contact_info_info flex flex-col items-start">
              <h3>Location</h3>
              <p>Lucknow, India</p>
            </div>
          </div>{" "}
          <div className="flex items-center gap-4 w-full">
            <span className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="tabler-icon tabler-icon-mail"
              >
                <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                <path d="M3 7l9 6l9 -6"></path>
              </svg>
            </span>
            <div className="contact_info_info flex flex-col items-start">
              <h3>Mail</h3>
              <p>
                <Link href="mailto:armanal3066@gmail.com">
                  armanal3066@gmail.com
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
