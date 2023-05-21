import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Lab } from "./Lab";

export interface LabsActivityProps {
  labs: Lab[];
}

export const LabsActivity = ({ labs }: LabsActivityProps) => {
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);

  return (
    <div className="flex flex-col">
      <div className="text-2xl font-bold text-center my-4">Aktifitas Lab</div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {labs.map((lab) => (
          <div
            key={lab.id}
            className={`mt-4 cursor-pointer relative flex flex-wrap items-center justify-center text-center w-[150px] md:w-[300px] h-[100px] p-8 border border-gray-500 ${
              lab.used_by ? "bg-green-500" : "bg-red-500"
            } hover:brightness-90 overflow-y-auto`}
          >
            {lab.name}
            <div
              className="absolute top-0 right-0 p-2 cursor-pointer"
              onClick={() => setSelectedLab(selectedLab === lab ? null : lab)}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="text-white" />
            </div>
            {selectedLab === lab && lab.used_by && (
              <div className="absolute top-0 right-0 bg-gray-200 text-gray-800 p-2 rounded-md">
                Used by {lab.used_by}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
