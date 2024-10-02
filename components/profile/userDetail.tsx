import dateTransform from "@/lib/format";
import axios from "axios";
import { getServerSession } from "next-auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import SocialForm from "./socialLinkForm";

const UserDetail = async () => {
  const session = await getServerSession();
  const res = await axios.post("http://localhost:3000/api/user", {
    email: session?.user?.email,
  });
  const date = dateTransform(res.data.user?.dateJoined);
  const linkedinUrl = res.data.user?.linkedinUrl;
  const twitterUrl = res.data.user?.twitterUrl;
  return (
    <div className="flex flex-col gap-1 border-b border-zinc-500 p-3">
      <h1 className="text-white text-2xl lg:text-3xl font-semibold tracking-tight">
        {session?.user?.name}
      </h1>
      <h1 className="text-zinc-400 text-md lg:text-lg font-semibold tracking-tight">{`Joined ${date}`}</h1>
      <div className="flex gap-3 text-zinc-400 text-sm lg:text-md font-semibold tracking-tight">
        <p>
          <span className="text-white">{`${
            res.data.user?.eventsAttended?.length() || 0
          }`}</span>{" "}
          Attended
        </p>
        <p>
          <span className="text-white">{`${
            res.data.user?.eventsHosted?.length() || 0
          }`}</span>{" "}
          Hosted
        </p>
      </div>
      <div className="flex gap-3">
        <div className="text-zinc-400 text-md lg:text-lg font-semibold tracking-tight hover:text-zinc-500 duration-300">
          {linkedinUrl ? (
            <Link href={linkedinUrl}>
              <FaLinkedin />
            </Link>
          ) : (
            <FaLinkedin />
          )}
        </div>
        <div className="text-zinc-400 text-md lg:text-lg font-semibold tracking-tight hover:text-zinc-500 duration-300">
          {twitterUrl ? (
            <Link href={twitterUrl}>
              <FaSquareXTwitter />
            </Link>
          ) : (
            <FaSquareXTwitter />
          )}
        </div>
        <AlertDialog>
          <AlertDialogTrigger><FiEdit className="text-zinc-400 text-md lg:text-lg font-semibold tracking-tight hover:text-zinc-500 duration-300"/></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Edit Social Links</AlertDialogTitle>
              <AlertDialogDescription>
                <SocialForm />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default UserDetail;
