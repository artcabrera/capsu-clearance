import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import ScrollArea from "../components/extras/ScrollArea";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/outline";

export default function SideBarCLA({ session, path }) {
  const signOpen = useRouter().pathname.includes("sign");
  const manageOpen = !signOpen;
  const sign = [
    {
      name: "Computer Science",
      shortname: "computerscience",
      link:
        "/admin/" + session.department.toLowerCase() + "/sign/computerscience",
    },
    {
      name: "Food Technology",
      shortname: "foodtech",
      link: "/admin/" + session.department.toLowerCase() + "/sign/foodtech",
    },
    {
      name: "Fisheries",
      shortname: "fisheries",
      link: "/admin/" + session.department.toLowerCase() + "/sign/fisheries",
    },
    {
      name: "Criminology",
      shortname: "criminology",
      link: "/admin/" + session.department.toLowerCase() + "/sign/criminology",
    },
    {
      name: "Elementary Education",
      shortname: "education",
      link: "/admin/" + session.department.toLowerCase() + "/sign/education",
    },
  ];

  const currentLink = (link) => {
    if (path === link) return true;
    return false;
  };

  const currentCourse = (shortname) => {
    if (path === shortname) return true;
    return false;
  };

  return (
    <ScrollArea>
      <div className="prose flex h-full w-full flex-col justify-between px-8 pt-8">
        <div className="flex h-full w-full flex-col justify-between">
          <div className="flex h-12 w-full">
            <div className="relative h-12 w-12 rounded-full bg-sky-500">
              {session.userphoto ? (
                <Image
                  src={session.userphoto}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              ) : (
                <h1 className="flex h-full w-full items-center justify-center text-lg font-normal text-white">
                  {session.firstname.charAt(0)}
                </h1>
              )}
            </div>
            <div className="ml-4 flex h-full w-fit flex-col">
              <h1 className="m-0 p-0 text-lg font-bold text-sky-500">
                {session.firstname}&nbsp;
                {session.lastname}
              </h1>
              <h1 className="m-0 h-fit p-0 text-xs font-normal text-gray-400">
                {session.department}
              </h1>
            </div>
          </div>
          <div className="mt-4 flex h-full w-full flex-col border-t border-gray-300/[0.5] pt-4 dark:border-gray-700/[0.5]">
            <Link href={"/admin/" + session.department.toLowerCase()}>
              <div className="group flex h-6 w-fit cursor-pointer items-center">
                <div className="relative h-6 w-6">
                  <Image
                    src="/assets/icons/dashboard.png"
                    layout="fill"
                    priority
                  />
                </div>
                <h4
                  className={`${
                    currentLink("/admin/" + session.department.toLowerCase())
                      ? "text-black dark:text-white"
                      : "text-slate-700 dark:text-slate-400"
                  } mb-6 pl-4 group-hover:text-black dark:group-hover:text-white `}
                >
                  Dashboard
                </h4>
              </div>
            </Link>
            <Disclosure defaultOpen={signOpen}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="group mt-6 flex w-full items-center justify-between">
                    <div className="flex h-6 w-fit cursor-pointer items-center">
                      <div className="relative h-6 w-6">
                        <Image
                          src="/assets/icons/approval.png"
                          layout="fill"
                          priority
                        />
                      </div>
                      <h4 className="mb-6 pl-4 text-slate-700 group-hover:text-black dark:text-slate-400 dark:group-hover:text-white">
                        For signing
                      </h4>
                    </div>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-4 w-4 text-slate-700 dark:text-slate-400`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="my-4 ml-2">
                    {sign.map((item, index) => (
                      <Link key={index} href={item.link}>
                        <div
                          className={`group flex h-6 w-fit cursor-pointer items-center border-l py-5 pl-8 ${
                            currentCourse("sign/" + item.shortname)
                              ? "border-sky-500"
                              : "border-gray-400 dark:border-gray-700"
                          }`}
                        >
                          <h4
                            className={`${
                              currentCourse("sign/" + item.shortname)
                                ? "text-black dark:text-white"
                                : "text-slate-700 dark:text-slate-400"
                            } mb-6 pl-4 group-hover:text-black dark:group-hover:text-white `}
                          >
                            {item.name}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure defaultOpen={manageOpen}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="group mt-6 flex h-fit w-full items-center justify-between">
                    <div className="flex h-6 w-fit cursor-pointer items-center">
                      <div className="relative h-6 w-6">
                        <Image
                          src="/assets/icons/manage.png"
                          layout="fill"
                          priority
                        />
                      </div>
                      <h4 className="mb-6 pl-4 text-slate-700 group-hover:text-black dark:text-slate-400 dark:group-hover:text-white">
                        Manage
                      </h4>
                    </div>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-4 w-4 text-slate-700 dark:text-slate-400`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="my-4 ml-2">
                    <Link
                      href={
                        "/admin/" +
                        session.department.toLowerCase() +
                        "/adminaccounts?action=delete"
                      }
                    >
                      <div
                        className={`group flex h-6 w-fit cursor-pointer items-center border-l py-5 pl-8 ${
                          currentLink(
                            "/admin/" +
                              session.department.toLowerCase() +
                              "/newadmin"
                          )
                            ? "border-sky-500"
                            : "border-gray-400 dark:border-gray-700"
                        }`}
                      >
                        <h4
                          className={`${
                            currentLink(
                              "/admin/" +
                                session.department.toLowerCase() +
                                "/newadmin"
                            )
                              ? "text-black dark:text-white"
                              : "text-slate-700 dark:text-slate-400"
                          } mb-6 pl-4 group-hover:text-black dark:group-hover:text-white `}
                        >
                          Admin accounts
                        </h4>
                      </div>
                    </Link>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
          <div className="flex h-full w-full items-end border-b border-gray-300/[0.5] px-4 py-4 dark:border-gray-700/[0.5] lg:px-0">
            <Link href={"/account/settings?user=Admin"}>
              <div className="group flex h-6 w-fit cursor-pointer items-center">
                <div className="relative h-6 w-6">
                  <Image
                    src="/assets/icons/settings.png"
                    layout="fill"
                    priority
                  />
                </div>
                <h4
                  className={`${
                    currentLink("/settings")
                      ? "text-black dark:text-white"
                      : "text-slate-700 dark:text-slate-400"
                  } mb-6 pl-4 group-hover:text-black dark:group-hover:text-white `}
                >
                  Settings
                </h4>
              </div>
            </Link>
          </div>
          <div className="flex h-fit w-full items-end px-4 pb-8 pt-4 lg:px-0">
            <div className="group w-fit">
              <button
                onClick={() => {
                  const rd = localStorage.getItem(session.username);
                  if (rd === "temp") localStorage.removeItem(session.username);
                  signOut();
                }}
                className="flex h-6 w-fit items-center"
              >
                <div className="relative h-6 w-6">
                  <Image
                    src="/assets/icons/logout.png"
                    layout="fill"
                    priority
                  />
                </div>
                <h4 className="mb-6 pl-4 text-slate-700 group-hover:text-black dark:text-slate-400 dark:group-hover:text-white">
                  Logout
                </h4>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
