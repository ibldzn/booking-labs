import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LabsContext } from "../contexts/LabsContext";

interface ReservedLab {
  _id: string;
  lab_id: string;
  user_id: string;
}

export const LabsActivity = () => {
  const labs = useContext(LabsContext);
  const [reservedLabIds, setReservedLabIds] = useState<string[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/reservations/active`, {
      signal,
    })
      .then((res) => res.json())
      .then((data) =>
        setReservedLabIds(
          Array.isArray(data)
            ? data.map((reservation) => reservation.lab_id)
            : []
        )
      );

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="text-2xl font-bold text-center my-4">Aktifitas Lab</div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {labs?.length === 0
          ? null
          : labs.map((lab) => (
              <Link
                to={`/labs/${lab._id}`}
                key={lab._id}
                className={`mt-4 cursor-pointer relative flex flex-wrap items-center justify-center text-center w-[150px] md:w-[300px] h-[100px] p-8 border border-gray-500 ${
                  // lab.used_by ? "bg-green-500" : "bg-red-500"
                  reservedLabIds.includes(lab._id)
                    ? "bg-green-500"
                    : "bg-red-500"
                } hover:brightness-90 overflow-y-auto`}
              >
                {lab.name}
              </Link>
            ))}
      </div>
    </div>
  );
};
