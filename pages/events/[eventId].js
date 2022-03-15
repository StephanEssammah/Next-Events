export default function Event() {
  return (
    <div className="flex flex-col p-4 h-screen bg-gray-800 text-white">
      <div className="py-2 flex justify-between bg-gray-700">
        <button>Back</button>
        <button>Fav</button>
      </div>
      <div className="w-full h-1/4 bg-gray-400" />
      <div className="mb-4">
        <h1 className="text-3xl">Event Title</h1>
        <p>Location</p>
      </div>
      <p className="text-gray-400">Event description</p>
    </div>
  );
}
