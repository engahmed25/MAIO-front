import DrCardList from "./drCardSpeciallity/DrCardList";
import Search from "./Search";
import Header from "./Header";

function Home() {
  return (
    <>  
    <div className="">
      <Header/>
    <Search />
    </div>
    <DrCardList />
    </>
  );
}

export default Home;
