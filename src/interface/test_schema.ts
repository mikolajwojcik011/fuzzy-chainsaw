import { IdQuestion } from "./id_question";
import { Question } from "./question";

export interface TestSchema {
    public_key: string;
    private_key: string;
    questionArr: Question[];
    IdQuestionArr: IdQuestion[];
}