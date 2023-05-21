export interface Lab {
  id: string;
  name: string;
  location: string;
  description: string;
  used_by?: string;
  images?: string[];
}

export const Lab = ({ lab }: { lab: Lab }) => {
  return (
    <div>
      <></>
    </div>
  );
};
