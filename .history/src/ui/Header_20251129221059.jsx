import Button from "./Button";
const Header = () => {
  return (
    <header className="bg-[var(--backGround-color)] pt-16 pb-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center">

          {/* TITLE */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--main-color)] leading-tight">
            FEEL BETTER ABOUT<br />
            <span className="block mt-2">FINDING HEALTHCARE</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="text-[var(--text-muted)] mt-6 leading-relaxed">
            Doctors are one of the most important people in society. 
            They are the sole reason our society is taking healthy 
            and positive steps towards progress because the health 
            of the body and mind is the reason behind the good work 
            people put up towards development.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-8">
            <Button className="px-5 py-2">
              Profiles for Every Doctor in America
            </Button>

            <Button className="px-5 py-2">
              More Than 10 Million Patient Ratings
            </Button>
          </div>

        </div>

        {/* RIGHT SIDE (IMAGES) */}
        <div className="flex justify-center items-center gap-4">
          <img 
            src="/images/doctor1.png" 
            alt="doctor" 
            className="w-56 md:w-64 rounded-xl object-cover"
          />
          {/* <img 
            src="/images/doctor2.png"
            alt="doctor"
            className="w-56 md:w-64 rounded-xl object-cover"
          /> */}
        </div>

      </div>
    </header>
  );
}

export default Header;
