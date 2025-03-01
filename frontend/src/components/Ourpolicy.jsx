import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className=" my-18 flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-4">
      <div>
        <img className="w-12 m-auto mb-5" src={assets.exchange_icon} alt="Easy Exchange" />
        <p className="font-semibold">Easy Exchange</p>
        <p className="text-sm">We offer a hassle-free exchange policy</p>
      </div>
      <div>
        <img className="w-12 m-auto mb-5" src={assets.quality_icon} alt="Easy Exchange" />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-sm">We offer 7 days free return  </p>
      </div>
      <div>
        <img className="w-12 m-auto mb-5" src={assets.support_img} alt="Easy Exchange" />
        <p className="font-semibold">Best customer support</p>
        <p className="text-sm">we provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
