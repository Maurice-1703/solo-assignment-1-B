// Union Type
export type Status = "all" | "open" | "done";

//Vertrag, der festlegt, welche Eigenschaften ein Objekt haben muss, um als Todo zu gelten
export interface Todo{
    id: number;
    text: string;
    done: boolean;
}