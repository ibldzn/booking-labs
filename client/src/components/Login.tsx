export const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-[#F7EAE4] h-screen">
      <img src="/logo-1.jpg" alt="logo" className="w-48 h-48" />
      <form className="flex flex-col gap-4 w-full h-full px-8 max-w-md">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          className="border-2 border-gray-500 rounded-md p-2"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="border-2 border-gray-500 rounded-md p-2"
        />
        <button
          type="submit"
          className="bg-[#F7EAE4] border-2 border-gray-500 rounded-md p-2"
        >
          Login
        </button>
      </form>
    </div>
  );
};
