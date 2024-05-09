import { Answer } from "./answer";

export interface Question{
    id: string
    layout?: string;
    head: string;
    index_style: number;
    answerArr: Answer[];
    multimedia_url?: string;
}