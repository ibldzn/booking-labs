import { Button, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { LabProps } from "./Lab";
import Notification from "./Notification";

export interface ReservationWidgetProps {
  lab: LabProps;
}

export const ReservationWidget = ({ lab }: ReservationWidgetProps) => {
  let now = Math.floor(Date.now() / 1000);
  const [date, setDate] = useState({
    start: now.toString(),
    end: (now + 60 * 60).toString(), // 1 hour
  });
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lab_id: lab._id,
        start_time: new Date(date.start).getTime() / 1000,
        end_time: new Date(date.end).getTime() / 1000,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setError(data.error);
        }
      });

    now = Math.floor(Date.now() / 1000);
    setDate({
      start: now.toString(),
      end: (now + 60 * 60).toString(), // 1 hour
    });
  };

  return (
    <>
      {error && (
        <Notification
          type="error"
          message={error}
          onClose={() => setError("")}
        />
      )}
      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <Typography variant="small">Dari</Typography>
          <Input
            id="start_time"
            name="start_time"
            type="datetime-local"
            color="light-blue"
            placeholder="Dari"
            value={date.start}
            onChange={(e) => setDate({ ...date, start: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <Typography variant="small">Sampai</Typography>
          <Input
            id="end_time"
            name="end_time"
            type="datetime-local"
            color="light-blue"
            placeholder="Sampai"
            value={date.end}
            onChange={(e) => setDate({ ...date, end: e.target.value })}
          />
        </div>
        <Button type="submit" className="mt-4">
          Buat Reservasi
        </Button>
      </form>
    </>
  );
};
