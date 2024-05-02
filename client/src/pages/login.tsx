import useAuth from "@/hooks/useAuth";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
const LoginWrapper = dynamic(()=> import("@/wrappers/LoginWrapper"),{ssr: false});

function Login() {
  const router = useRouter();
  const {user} = useAuth();

  useEffect(()=> {
    if(user?._id) {
      if(user?.role === "student") {
        router.replace("/");
      }
      else {
        router.replace("/admin");
      }
    }
  }, [user?._id, router]);

  return (
    <LoginWrapper />
  );
}
export default Login;
