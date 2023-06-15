import { useEffect, useState } from "react";
import { ImageCarousel } from "./ImageCarousel";
import { useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { ReservationWidget } from "./ReservationWidget";
import Notification from "./Notification";

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
type CurrentlyDisplayedItem = "info" | "create-reservation" | "schedule";

const LabInformation = ({ lab }: { lab: LabProps | null }) => {
  const [laboran, setLaboran] = useState<Laboran[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/laboran`)
      .then((res) => res.json())
      .then((data) => setLaboran(data));
  }, []);

  return (
    <div className="flex flex-col w-full items-center justify-center">
      {lab && (
        <div className="w-3/4">
          {lab.images && lab.images.length > 0 ? (
            <ImageCarousel images={lab.images} />
          ) : null}
          <Typography variant="h3" className="text-center">
            {lab.name}
          </Typography>
          <div className="mt-8 mb-2 grid gap-4 grid-cols-1 md:grid-cols-[2fr_1fr]">
            <div>
              <div className="my-4 w-1/2">
                <h2 className="font-semibold text-2xl">Deskripsi</h2>
                {lab.description}
              </div>
            </div>
            <ReservationWidget lab={lab} />
          </div>
          <div className="mb-2">
            <Typography variant="h4">Lokasi</Typography>
            <Typography>{lab.location}</Typography>
          </div>
          <div className="mb-2">
            <Typography variant="h4">Laboran</Typography>
            <Typography>
              {laboran
                .map((laboran) => `${laboran.name} (${laboran.phone})`)
                .join(", ")}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};

const Sidebar = ({
  setCurrentItem,
}: {
  setCurrentItem: (item: CurrentlyDisplayedItem) => void;
}) => {
  return (
    <div className="min-h-full w-32 p-4 bg-white flex flex-col gap-8">
      <div
        onClick={() => setCurrentItem("info")}
        className="flex flex-col mt-8 mb-2 hover:brightness-90 hover:cursor-pointer"
      >
        <FontAwesomeIcon
          icon={faInfoCircle}
          className="text-gray-400 text-lg"
        />
        <span className="text-xs text-center text-gray-500 mt-2">
          Informasi Lab
        </span>
      </div>
      <div
        onClick={() => setCurrentItem("schedule")}
        className="flex flex-col mb-2 hover:brightness-90 hover:cursor-pointer"
      >
        <FontAwesomeIcon
          icon={faCalendarAlt}
          className="text-gray-400 text-lg"
        />
        <span className="text-xs text-center text-gray-500 mt-2">Jadwal</span>
      </div>
    </div>
  );
};

const ReservationTable = ({ lab }: { lab: LabProps }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reservationStatus, setReservationStatus] =
    useState<ReservationType>("active");

  const TabButton = ({ text = "", selected = false, onClick = () => {} }) => (
    <button
      className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
        selected ? "bg-white" : "bg-gray-200"
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
    fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/v1/reservations/${reservationStatus}/${lab._id}`
    )
      .then((res) => res.json())
      .then((data) => setReservations(data));
  }, [reservationStatus]);

  return (
    <>
      {message && (
        <Notification
          type="error"
          message={message}
          onClose={() => setMessage(null)}
        />
      )}
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
                        <TD>
                          {new Date(reservation.end_time).toLocaleString()}
                        </TD>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const Lab = () => {
  const { id } = useParams();
  const [lab, setLab] = useState<LabProps | null>(null);
  const [currentItem, setCurrentItem] =
    useState<CurrentlyDisplayedItem>("info");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/labs/${id}`)
      .then((res) => res.json())
      .then((data) => setLab(data));
  }, [id]);

  const component = {
    info: <LabInformation lab={lab} />,
    schedule: <ReservationTable lab={lab!} />,
    "create-reservation": <div>Create reservation</div>,
  };

  return (
    <div className="flex w-screen h-screen">
      {lab ? (
        <>
          <Sidebar setCurrentItem={setCurrentItem} />
          <div className="overflow-auto w-full mx-4">
            {component[currentItem]}
          </div>
        </>
      ) : null}
    </div>
  );
};
