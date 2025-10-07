"use client";
import React, { useState } from "react";
import Nav from "./nav";

const NavWrapper = () => {
  const openNav = () => {
    console.log("no action required for now")
  }
  return (
    <div>
      <Nav openNav={openNav} />
  
    </div>
  );
};

export default NavWrapper;