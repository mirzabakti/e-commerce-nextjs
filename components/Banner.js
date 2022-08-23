import { Carousel } from "flowbite-react";
import Image from "next/image";

const Banner = () => {
  return (
    <>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 container mx-auto p-5">
        <Carousel>
          <div className="relative h-32 lg:h-96">
            <Image src="/images/banner1.png" alt="..." width={100} height={100} objectFit="cover" layout="fill" />
          </div>
          <div className="relative h-32 lg:h-96">
            <Image src="/images/banner2.png" alt="..." width={100} height={100} objectFit="cover" layout="fill" />
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default Banner;
