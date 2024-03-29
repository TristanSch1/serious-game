import { useState } from "react";
import clsx from "clsx";

type Props = {
    title: string;
    content: string;
};

export function Accordion(props: Props) {
    const [state, setState] = useState<"open" | "close">("close");

    return (
        <>
            <div
                className={clsx(
                    "select-none hover:cursor-pointer flex justify-between items-center px-4 py-2 border-[0.3px] border-neutral-10 transition-all",
                    state === "open" ? "bg-primary-dark" : "bg-white",
                )}
                onClick={() => {
                    state === "open" ? setState("close") : setState("open");
                }}
            >
                <p className={"font-bold"}>{props.title}</p>
                <svg width="28" height="14" viewBox="0 0 28 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {state === "open" ? (
                        <path
                            d="M2 11.2859L14 2.64292L26 11.2859"
                            stroke="white"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    ) : (
                        <path
                            d="M26 2.64307L14 11.286L2 2.64307"
                            stroke="#FF7001"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    )}
                </svg>
            </div>
            <div
                dangerouslySetInnerHTML={{ __html: props.content }}
                className={clsx(
                    "list-disc bg-white border-l border-r border-neutral-10 transition-[max-height] ease-out duration-500",
                    {
                        "max-h-0 overflow-hidden": state === "close",
                        "max-h-screen py-4 px-8": state === "open",
                    },
                )}
            />
        </>
    );
}
