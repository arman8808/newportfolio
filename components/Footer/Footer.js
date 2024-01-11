'use client'
import { GitHub, LinkedIn } from "@mui/icons-material";
import React from "react";

function Footer() {
  return (
    <footer className="flex items-center justify-center">
      <div className="footer w-full flex items-center justify-between">
        <h3>Copyright © 2024. All rights are reserved</h3>
        <div className="flex items-center gap-3">
            <LinkedIn style={{fontSize:'2rem',cursor:'pointer'}}/>
            <GitHub style={{fontSize:'2rem',cursor:'pointer'}}/>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
