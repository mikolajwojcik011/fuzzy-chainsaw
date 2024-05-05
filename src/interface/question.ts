import { Answer } from "./answer";

export interface Question{
    layout: string;
    correct_answer: number;
    head: string;
    body: Answer[];
    multimedia_url?: string;
}