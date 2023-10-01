import Wrapper from "@/components/wrappers/Main";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Links } from "@/types";
import main from "@/assets/images/main-test.svg";
import TitleLogo from "@/components/ui/titlelogo";

function Landing() {
  return (
    <Wrapper>
      <nav className="nav ">
        <TitleLogo position="start" />
      </nav>

      <section className="flex justify-center items-center h-[80vh]">
        <div className="flex flex-col items-start justify-center space-y-6  md:w-2/3">
          <h2 className="text-6xl font-bold  ">
            Welcome to <span className="text-primary">Jobify</span>
          </h2>
          <p className="text-xl  text-muted-foreground">
            Your dream job is just a click away. Join Jobify today and take the
            first step towards a brighter future. Let's embark on this exciting
            journey together and make your career aspirations a reality.
          </p>
          <div className="landing-cta space-x-2">
            <Link
              to={Links.REGISTER}
              className={buttonVariants({
                variant: "default",
                size: "lg",
              })}
            >
              Register
            </Link>
            <Link
              to={Links.LOGIN}
              className={buttonVariants({
                variant: "default",
                size: "lg",
              })}
            >
              Login / Demo
            </Link>
          </div>
        </div>
        <div className="hidden md:block md:w-1/3">
          <img src={main} alt="Landing main logo" className="w-full" />
        </div>
      </section>
    </Wrapper>
  );
}

export default Landing;
