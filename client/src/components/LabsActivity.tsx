import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LabsContext } from "../contexts/LabsContext";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { LabProps } from "./Lab";

interface ReservedLab {
  _id: string;
  lab_id: string;
  user_id: string;
  klass: string;
  start_time: Date;
  end_time: Date;
}

const LabCard = ({
  lab,
  reservedLabs,
}: {
  lab: LabProps;
  reservedLabs: ReservedLab[];
}) => {
  const reservedLab = reservedLabs.find((l) => l.lab_id === lab._id);
  const isReserved = !!reservedLab;

  return (
    <Link
      to={`/labs/${lab._id}`}
      className="hover:cursor-pointer hover:brightness-90 line-clamp-2"
    >
      <Card
        className={`w-64 h-36 ${isReserved ? "bg-red-500" : "bg-green-500"}`}
      >
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {lab.name}
          </Typography>
          <Typography>
            {isReserved ? `Reserved (Kelas ${reservedLab.klass})` : "Available"}
          </Typography>
        </CardBody>
      </Card>
    </Link>
  );
};

export const LabsActivity = () => {
  const labs = useContext(LabsContext);
  const [reservedLabs, setReservedLabs] = useState<ReservedLab[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/reservations/active`)
      .then((res) => res.json())
      .then((data) => setReservedLabs(data));
  }, []);

  return (
    <div className="flex flex-col w-full h-full items-center">
      <div className="text-2xl font-bold text-center my-4">Aktifitas Lab</div>
      <div className="flex flex-wrap items-center justify-center gap-4 w-3/4 h-full">
        {labs?.length === 0
          ? null
          : labs.map((lab) => (
              <LabCard key={lab._id} lab={lab} reservedLabs={reservedLabs} />
            ))}
      </div>
    </div>
  );
};
