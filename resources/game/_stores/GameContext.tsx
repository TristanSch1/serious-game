import { createContext, FC, PropsWithChildren, useContext } from "react";
import { GameStore } from "./GameStore";
import { TQuizzBaseMdl } from "../../quizz/_models/QuizzMdl";

export const emptyQuizz: TQuizzBaseMdl = {
    _id: "",
    name: "",
    description: "",
    duration: 0,
    difficulty: 0,
    questions: [
        {
            _id: "",
            text: "",
            answers: {
                a: { _id: "", text: "" },
                b: { _id: "", text: "" },
                c: { _id: "", text: "" },
                d: { _id: "", text: "" },
            },
        },
    ],
};
const GameCtx = createContext(new GameStore(emptyQuizz, 0, 0));

const GameProvider: FC<{ store: GameStore; children: PropsWithChildren<any> }> = ({ store, children }) => {
    return <GameCtx.Provider value={store}>{children}</GameCtx.Provider>;
};

const useGameStore = () => {
    return useContext(GameCtx);
};

export { GameProvider, useGameStore };
