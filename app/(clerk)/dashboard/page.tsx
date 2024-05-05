/* import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const { has } = auth();

  const canManage = has({ permission: "org:team_settings:manage" });

  if (!canManage) return null;

  return (
    <div>
      <h1>dashboasrd</h1>
      <UserButton />
    </div>
  );
}
 */

import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const { orgRole } = auth();
  const { userId }: { userId: string | null } = auth();

  return (
    <>
      <div className="flex flex-col">
        <div>Your current role is {orgRole}</div>
        <div>user id {userId}</div>
        <UserButton />
      </div>
    </>
  );
}
