import { useNavigate } from "react-router-dom";

function DrCardModel({ img, drSpeciallityTitle }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const searchBydrSpeciallityTitle = drSpeciallityTitle.toLowerCase();
    navigate(`/doctors/specialization/${searchBydrSpeciallityTitle}`);
  };

  return (
    <div
      onClick={handleClick}
      className=" cursor-pointer
      flex flex-col 
      items-center 
      p-2 
      shadow-[0px_5px_15px_rgba(0,0,0,0.35)]
      rounded-(--main-radius)
      transition-transform 
      duration-300 
      transform 
      hover:scale-110"
    >
      <img
        src={img}
        alt={drSpeciallityTitle}
        className="w-20 h-20 object-cover"
      />
      <p className="mt-2 font-semibold">{drSpeciallityTitle}</p>
    </div>
  );
}

export default DrCardModel;
