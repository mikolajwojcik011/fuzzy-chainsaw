import { Answer } from "./answer";

export interface Question{
    id: string
    layout?: string;
    head: string;
    answerArr: Answer[];
    multimedia_url?: string;
}