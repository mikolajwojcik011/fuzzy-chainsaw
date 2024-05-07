import { Answer } from "./answer";

export interface Question{
    id: string
    layout?: string;
    correct_answer: number;
    head: string;
    body: Answer[];
    multimedia_url?: string;
}