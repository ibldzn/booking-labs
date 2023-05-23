import { useEffect, useState } from "react";
import { ImageCarousel } from "./ImageCarousel";

export interface LabProps {
  id: string;
  name: string;
  location: string;
  description: string;
  used_by?: string;
  images?: string[];
}

export interface Laboran {
  name: string;
  phone: string;
}

export const Lab = ({ lab }: { lab: LabProps }) => {
  const [laboran, setLaboran] = useState<Laboran[]>([]);

  useEffect(() => {
    fetch("http://localhost:8081/laboran")
      .then((res) => res.json())
      .then((data) => setLaboran(data));
  }, []);

  return (
    <div className="flex flex-col w-1/2">
      <ImageCarousel images={lab.images || []} />
      <div className="text-2xl font-bold text-center my-4">{lab.name}</div>
      <div className="mb-2">
        <span className="font-bold">Deskripsi: </span>
        <span>{lab.description}</span>
      </div>
      <div className="mb-2">
        <span className="font-bold">Lokasi: </span>
        <span>{lab.location}</span>
      </div>
      <div className="mb-2">
        <span className="font-bold">Laboran: </span>
        <span>
          {laboran
            .map((laboran) => `${laboran.name} (${laboran.phone})`)
            .join(", ")}
        </span>
      </div>
      <div className="mb-2">
        <span className="font-bold">Digunakan oleh: </span>
        <span>{lab.used_by || "Tidak ada"}</span>
      </div>
    </div>
  );
};
