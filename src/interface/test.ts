import { Question } from "./question";

export interface Test {
    public_key: string;
    private_key: string;
    results_at: string;
    qyestions: Question[];
}