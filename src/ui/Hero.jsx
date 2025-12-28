import Button from "./Button";
// Hero sections
function Hero() {
  return (
    <header className="bg-[var(--backGround-color)] pt-8 pb-20 mb-0">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center">
          {/* TITLE */}
          <h1 className="text-4xl md:text-4xl font-extrabold text-[var(--main-lite-color)] leading-tight">
            FEEL BETTER ABOUT
            <br />
            <span className="block mt-2">FINDING HEALTHCARE</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="text-[var(--head-desc-color)] mt-6 leading-relaxed">
            Doctors are one of the most important people in society. They are
            the sole reason our society is taking healthy and positive steps
            towards progress because the health of the body and mind is the
            reason behind the good work people put up towards development.
          </p>

          {/* BUTTONS */}
          <div className="flex gap-8 mt-6 px-28 pl-0 max-w-xl">
            <Button className="px-1 py-1">
              Profiles for Every Doctor in America
            </Button>

            <Button className="px-1 py-1">
              More Than 10 Million Patient Ratings
            </Button>
          </div>
        </div>

        {/* RIGHT SIDE (IMAGES) */}
        <div className="flex justify-center items-center gap-1 ">
          <img
            src="/src/assets/headerPhoto/dr1.png"
            alt="doctor"
            className="w-56 md:w-64 rounded-xl object-cover"
          />
          <img
            src="/src/assets/headerPhoto/dr2.png"
            alt="doctor"
            className="w-56 md:w-64 rounded-xl object-cover"
          />
        </div>
      </div>
    </header>
  );
}

export default Hero;
