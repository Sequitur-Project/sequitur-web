import { ResponseModel } from "./response-model";
import { TrainingPhrase } from "./training-phrase-model";


export class Intent {
  id?: String;
  displayName: string;
  trainingPhrases: TrainingPhrase[];
  responses: ResponseModel[];
  created_at: Date;
}
