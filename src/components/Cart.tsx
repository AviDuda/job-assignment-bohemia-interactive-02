import Image from "next/image";
import { MouseEvent } from "react";

import SvgCloseIcon from "./svg/SvgCloseIcon";

interface CartProps {
    onCartOpenChange: (e: MouseEvent) => unknown;
}

export default function Cart({ onCartOpenChange }: CartProps) {
    return (
        <div className="absolute top-0 right-0 z-20 flex flex-col gap-6 border-4 border-t-[1px] border-gray-200 bg-white px-6 py-7">
            <a href="#" onClick={onCartOpenChange} className="w-min self-end">
                <SvgCloseIcon />
            </a>
            <div className="flex flex-col gap-8">
                {[null, null, null].map((val) => (
                    <div key={val} className="flex flex-wrap justify-between gap-5">
                        <div className="flex-1">
                            <h4 className="text-xl font-bold">Samurai King Resting</h4>
                            <p className="text-3xl text-gray-600">$10000.00</p>
                        </div>
                        <div className="relative w-20">
                            <Image
                                src="https://images.pexels.com/photos/12416757/pexels-photo-12416757.jpeg?auto=compress&cs=tinysrgb&h=130"
                                layout="fill"
                                objectFit="contain"
                                alt="Cart item TODO"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
