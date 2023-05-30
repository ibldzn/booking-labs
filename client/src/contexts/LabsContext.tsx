import { createContext } from "react";
import { LabProps } from "../components/Lab";

export const LabsContext = createContext<LabProps[]>([]);
