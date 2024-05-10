import { Question } from "./question";

export interface TestSchema {
    public_key: string;
    private_key: string;
    QuestionArr: Question[];
}