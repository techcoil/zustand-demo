import { useFormId } from "../context/app";
import { usePersistCurrentField } from "../data/service-fields";
import { useCurrentUser, useLogin, useLogout } from "../data/user";

export function Header() {
  const formId = useFormId();
  const { data: user } = useCurrentUser();
  const { mutate: persist, isPending: isPendingPersist } =
    usePersistCurrentField(formId);
  const { mutate: login } = useLogin();
  const { mutate: logout } = useLogout();

  return (
    <nav className="w-full p-4 flex items-center gap-4 justify-between bg-blue-300">
      <div className="flex gap-2  items-center text-sm">
        {user && (
          <>
            <img
              src={user.profilePic}
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <h4>Hello {user.name} </h4>
          </>
        )}
      </div>
      <div className="flex-grow text-center">Editing form #{formId}</div>
      {user && (
        <button
          className="border enabled:hover:bg-gray-200 bg-gray-100 py-2 px-4 text-xs disabled:opacity-50"
          disabled={isPendingPersist}
          onClick={() => persist()}
        >
          {isPendingPersist ? "saving..." : "Save Data"}
        </button>
      )}
      <button
        className="border  hover:bg-gray-200 bg-gray-100 py-2 px-4 text-xs disabled:opacity-50"
        onClick={() => (user ? logout() : login())}
      >
        {user ? "Logout" : "Login"}
      </button>
    </nav>
  );
}
