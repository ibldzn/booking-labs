export interface Lab {
  id: string;
  name: string;
  location: string;
  description: string;
  used_by?: string;
}

export interface LabsActivityProps {
  labs: Lab[];
}

export const LabsActivity = ({ labs }: LabsActivityProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {labs.map((lab) => (
        <div
          key={lab.id}
          className={`mt-4 cursor-pointer flex flex-wrap items-center justify-center text-center w-[150px] md:w-[300px] h-[100px] p-8 border border-gray-500 ${
            lab.used_by ? "bg-green-500" : "bg-red-500"
          } hover:brightness-90 overflow-y-auto`}
        >
          {lab.name}
        </div>
      ))}
    </div>
  );
};
