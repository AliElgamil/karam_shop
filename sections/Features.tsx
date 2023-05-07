import { features } from "@/constant/features";
import { sections } from "./styles";
import Image from "next/image";

export default function Features() {
  return (
    <section className={`${sections.sectionPadding}`}>
      <div className="container m-auto">
        <div className="bg-white shadow-[10px_10px_30px_rgba(0,0,0,0.1)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
          {features.map((feature, ind) => (
            <div key={ind} className="text-center group">
              <Image
                src={feature.img}
                alt={feature.title}
                width={30}
                height={30}
                className="m-auto mb-5 transition group-hover:opacity-50"
              />
              <h2 className="text-head-color font-bold">{feature.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
