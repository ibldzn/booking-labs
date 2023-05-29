import { useContext, useEffect, useState } from "react";
import { ImageCarousel } from "./ImageCarousel";
import { useParams } from "react-router-dom";
import { LabsContext } from "../contexts/LabsContext";

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
  klass: string;
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

type ReservationType = "past" | "active" | "future";

const getLabNameById = (labs: LabProps[], id: string) => {
  const lab = labs.find((lab) => lab._id === id);
  return lab ? lab.name : "";
};

const LabInformation = ({ lab }: { lab: LabProps | null }) => {
  const { id } = useParams();
  const [laboran, setLaboran] = useState<Laboran[]>([]);
  const [reserver, setReserver] = useState<Reserver | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/laboran`)
      .then((res) => res.json())
      .then((data) => setLaboran(data));
  }, []);

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

const ReservationTable = ({ lab }: { lab: LabProps }) => {
  const labs = useContext(LabsContext);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reservationStatus, setReservationStatus] =
    useState<ReservationType>("active");

  const TabButton = ({ text = "", selected = false, onClick = () => {} }) => (
    <button
      className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:text-gray-300 ${
        selected ? "dark:bg-gray-800" : "bg-gray-900"
      }`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
  const TH = ({ text = "" }) => (
    <th
      scope="col"
      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      {text}
    </th>
  );
  const TD = ({ children }: { children: React.ReactNode }) => (
    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
      {children}
    </td>
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/v1/reservations/${reservationStatus}/${lab._id}`,
      {
        signal,
      }
    )
      .then((res) => res.json())
      .then((data) => setReservations(data));
  }, [reservationStatus]);

  return (
    <section className="container px-4 mx-auto">
      <div className="mt-6 md:flex md:items-center md:justify-between">
        <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
          <TabButton
            text="Active"
            selected={reservationStatus === "active"}
            onClick={() => setReservationStatus("active")}
          />
          <TabButton
            text="Past"
            selected={reservationStatus === "past"}
            onClick={() => setReservationStatus("past")}
          />
          <TabButton
            text="Upcoming"
            selected={reservationStatus === "future"}
            onClick={() => setReservationStatus("future")}
          />
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <TH text="No" />
                    <TH text="Lab" />
                    <TH text="Kelas" />
                    <TH text="Waktu Mulai" />
                    <TH text="Waktu Selesai" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {reservations.map((reservation, index) => (
                    <tr key={reservation._id}>
                      <TD>{index + 1}</TD>
                      <TD>{lab.name}</TD>
                      <TD>{reservation.klass}</TD>
                      <TD>
                        {new Date(reservation.start_time).toLocaleString()}
                      </TD>
                      <TD>{new Date(reservation.end_time).toLocaleString()}</TD>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Lab = () => {
  const { id } = useParams();
  const [lab, setLab] = useState<LabProps | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/labs/${id}`, {
      signal,
    })
      .then((res) => res.json())
      .then((data) => setLab(data));

    return () => {
      controller.abort();
    };
  }, [id]);

  return <>{lab ? <ReservationTable lab={lab} /> : null}</>;
};
