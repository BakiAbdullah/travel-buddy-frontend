import ChooseYourAdventure from "@/components/modules/Home/ChooseYourAdventure";
import Hero from "@/components/modules/Home/Hero";
import PopularPlaces from "@/components/modules/Home/PopularPlaces";
import Testimonials from "@/components/modules/Home/Testimonials";
import TopRatedTravelers from "@/components/modules/Home/TopRatedTravelers";
import WhyChooseUs from "@/components/modules/Home/WhyChooseUs";

export default function Home  () {
  return (
    <>
      <Hero />
      <PopularPlaces/>
      <Testimonials />
      <TopRatedTravelers />
      <WhyChooseUs />
      <ChooseYourAdventure/>
    </>
  )
}

