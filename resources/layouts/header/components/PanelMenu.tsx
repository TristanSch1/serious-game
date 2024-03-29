import { observer } from "mobx-react-lite";
import clsx from "clsx";
import Link from "next/link";
import { useMobxStores } from "../../../../_common/_stores/Stores";
import { pages } from "../../../../_config/pages";
import useUser from "../../../../lib/users/_helpers/useUser";

type Props = {};

export const PanelMenu = observer((props: Props) => {
    const { menuStore } = useMobxStores();
    const { user } = useUser();
    const userIsLogged = user?.data.isLoggedIn;
    return (
        <div
            className={clsx(
                "fixed inset-0 bg-gradient-to-tr from-black to-neutral-90 z-40 -translate-y-full ease-in-out duration-300 flex flex-col items-center justify-center",
                {
                    "translate-y-0": menuStore.isOpen,
                },
            )}
        >
            <div className={"text-white flex flex-col text-center text-5xl font-extrabold gap-6"}>
                <Link href={pages.formations.path}>
                    <a className={"hover:text-primary ease-in-out duration-500"} onClick={() => menuStore.toggleOpen()}>
                        Formations
                    </a>
                </Link>
                <Link href={pages.contact.path}>
                    <a className={"hover:text-primary ease-in-out duration-500"} onClick={() => menuStore.toggleOpen()}>
                        Contact
                    </a>
                </Link>
                {userIsLogged && (
                    <Link href={pages.monCompte.path}>
                        <a
                            className={"hover:text-primary ease-in-out duration-500"}
                            onClick={() => menuStore.toggleOpen()}
                        >
                            Mon Compte
                        </a>
                    </Link>
                )}
                {!userIsLogged && (
                    <Link href={pages.register.path}>
                        <a
                            className={"hover:text-primary ease-in-out duration-500"}
                            onClick={() => menuStore.toggleOpen()}
                        >
                            S&rsquo;inscrire
                        </a>
                    </Link>
                )}
                {!userIsLogged && (
                    <Link href={pages.login.path}>
                        <a
                            className={"hover:text-primary ease-in-out duration-500"}
                            onClick={() => menuStore.toggleOpen()}
                        >
                            Se connecter
                        </a>
                    </Link>
                )}
            </div>
        </div>
    );
});
