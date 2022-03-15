export default function Login() {
  return (
    <div className="flex flex-col text-center p-4 h-screen bg-gray-800 justify-center">
      <h1 className="text-white mb-4">Login</h1>
      <form className="flex flex-col">
        <input className="p-2" type="email" placeholder="Email" />
        <input className="p-2" type="password" placeholder="Password" />
        <button className="text-white bg-gray-400 p-2">Login</button>
      </form>
      <p className="text-white mt-4">Create Account</p>
    </div>
  );
}
