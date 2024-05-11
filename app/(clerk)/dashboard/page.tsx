import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Dropzone from "../../components/Dropzone";

export default async function Dashboard() {
  const { userId }: { userId: string | null } = auth();
  const user = await currentUser();
  const adminId = process.env.NEXT_PRIVATE_ADMIN_KEY;

  if (userId === adminId) {
    return (
      <div className="container flex flex-col justify-center pl-8 pr-8">
        <h1 className="text-xl font-bold lg:text-3xl">Upravljačka ploča</h1>
        <h2 className="mt-2 text-base lg:mt-5 lg:text-2xl">
          Dobro došli, {user?.firstName}
        </h2>
        <div className="mt-5 lg:mt-10">
          <UserButton afterSignOutUrl="/" />
        </div>
        <section className="py-24">
          <div className="container">
            <h1 className="text-3xl font-bold">Dodavanje slika</h1>
            <Dropzone className="mt-10 border border-black rounded-lg p-16" />
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <div className="container flex flex-col items-center justify-center gap-3">
        <h1 className="text-[8rem] font-bold">403</h1>
        <h2 className="text-3xl">Zabranjeno</h2>
        <span className="text-center">
          Nemate dozvolu za pristup ovoj stranici. Pokušajte se prijaviti sa
          drugim računom.
        </span>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    );
  }
}
