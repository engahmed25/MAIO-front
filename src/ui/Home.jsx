import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Search from "./Search";
import DrCardList from "../ui/drCardSpeciallity/DrCardList";

function Home() {
  return (
    <>
      <Hero />
      <Search />
      <DrCardList />
    </>
  );
}

export default Home;
