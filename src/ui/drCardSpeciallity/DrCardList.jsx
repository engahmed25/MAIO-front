import DrCardModel from "./DrCardModel";

const drSpeciallityImages = import.meta.glob(
  "../../assets/DrSpecialityImgs/*.png",
  { eager: true }
);

function DrCardList() {
  const items = Object.entries(drSpeciallityImages).map(([imgPath, file]) => {
    const fileName = imgPath.split("/").pop().replace(".png", "");
    const title = fileName.charAt(0).toUpperCase() + fileName.slice(1);

    return {
      img: file.default,
      title: title,
    };
  });

  return (
    <section>
      <div className="flex flex-col  items-center ">
        <h2 className="font-bold text-3xl">Find by Speciality</h2>
        <p className=" text">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </p>
      </div>
      <div
        className="grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
        gap-4
        m-6"
      >
        {items.map((item, index) => (
          <DrCardModel
            key={index}
            img={item.img}
            drSpeciallityTitle={item.title}
          />
        ))}
      </div>
    </section>
  );
}

export default DrCardList;
