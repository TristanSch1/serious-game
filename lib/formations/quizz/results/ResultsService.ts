import CrudService from "../../../crud/CrudService";
import { IResultsDocument, IResultsModel, ResultsModel } from "./ResultsModel";

class ResultsService extends CrudService<"results", IResultsModel, IResultsDocument> {
    constructor() {
        super("results", ResultsModel, false);
    }

    getResults(quizzId: string, userId: string) {
        return ResultsModel.findOne({ quizz: quizzId, user: userId });
    }
}

export const resultsService = new ResultsService();
