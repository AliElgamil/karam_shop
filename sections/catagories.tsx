import Image from "next/image";
import { category, sections } from "./styles";
import useSWR from "swr";
import Link from "next/link";
import ImageLazy from "@/components/ImageLazy";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Catagories() {
  const { data, error } = useSWR<{ image: string; name: string }[]>(
    "https://api.escuelajs.co/api/v1/categories",
    fetcher
  );

  return (
    <section className={`${sections.sectionPadding}`}>
      <div className="container m-auto">
        <div className={`${category.gridContainer}`}>
          {data?.map((category, ind) =>
            ind <= 4 ? (
              <div key={ind} className="relative overflow-hidden group">
                <ImageLazy src={`${category.image}`} alt={category.name} />
                <Link
                  href={"/"}
                  className=" absolute inset-0 bg-black/60 grid place-content-center text-white transition opacity-0 group-hover:opacity-100"
                >
                  <span className=" transition duration-300 translate-y-full group-hover:translate-y-0 ">
                    {category.name}
                  </span>
                </Link>
              </div>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}
