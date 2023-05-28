import { useEffect, useState } from "react";
import { ImageCarousel } from "./ImageCarousel";
import { useParams } from "react-router-dom";

export interface LabProps {
  _id: string;
  name: string;
  location: string;
  description: string;
  images?: string[];
}

export interface Reservation {
  _id: string;
  lab_id: string;
  user_id: string;
  start_time: Date;
  end_time: Date;
}

export interface Reserver {
  username: string;
  klass: string;
}

export interface Laboran {
  name: string;
  phone: string;
}

export const Lab = () => {
  const { id } = useParams();
  const [lab, setLab] = useState<LabProps | null>(null);
  const [laboran, setLaboran] = useState<Laboran[]>([]);
  const [reserver, setReserver] = useState<Reserver | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/laboran`)
      .then((res) => res.json())
      .then((data) => setLaboran(data));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/labs/${id}`)
      .then((res) => res.json())
      .then((data) => setLab(data));
  }, [id]);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/reservations/active/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          setReserver(null);
          return;
        }

        const { user_id } = data[0];
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${user_id}`)
          .then((res) => res.json())
          .then((data) => setReserver(data));
      });
  }, [id]);

  return (
    <div className="flex flex-col w-1/2">
      {lab && (
        <>
          {lab.images && lab.images.length > 0 ? (
            <ImageCarousel images={lab.images} />
          ) : null}
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
            <span>{`${
              reserver ? `Kelas ${reserver.klass} (${reserver.username})` : "-"
            }`}</span>
          </div>
        </>
      )}
    </div>
  );
};
