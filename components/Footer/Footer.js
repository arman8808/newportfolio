"use client";
import { GitHub, LinkedIn } from "@mui/icons-material";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="flex items-center justify-center">
      <div className="footer w-full flex items-center justify-between">
        <h3>Copyright © 2025. All rights are reserved</h3>
        <div className="flex items-center gap-3">
          <Link
            href="https://www.linkedin.com/in/arman-ali-0b7480147/"
            target="_blank"
          >
            <LinkedIn style={{ fontSize: "2rem", cursor: "pointer" }} />
          </Link>
          <Link href="https://github.com/arman8808" target="_blank">
            <GitHub style={{ fontSize: "2rem", cursor: "pointer" }} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
