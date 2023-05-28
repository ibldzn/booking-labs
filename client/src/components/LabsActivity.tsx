import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { LabProps } from "./Lab";
import { Link } from "react-router-dom";

interface ReservedLab {
  _id: string;
  lab_id: string;
  user_id: string;
}

export const LabsActivity = () => {
  const [labs, setLabs] = useState<LabProps[]>([]);
  const [reservedLabIds, setReservedLabIds] = useState<string[]>([]);
  const [selectedLab, setSelectedLab] = useState<LabProps | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/labs`, { signal })
      .then((res) => res.json())
      .then((data) => setLabs(data));

    return () => {
      controller.abort();
    };
  }, []);

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
                <div
                  className="absolute top-0 right-0 p-2 cursor-pointer"
                  onClick={() =>
                    setSelectedLab(selectedLab === lab ? null : lab)
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="text-white" />
                </div>
                {selectedLab === lab && lab.used_by && (
                  <div className="absolute top-0 right-0 bg-gray-200 text-gray-800 p-2 rounded-md">
                    Used by {lab.used_by}
                  </div>
                )}
              </Link>
            ))}
      </div>
    </div>
  );
};
