export default function Events() {
  const events = [
    {
      title: "Kickoff Event",
      location: "Oslo",
    },
    {
      title: "Social Event",
      location: "Oslo",
    },
    {
      title: "Another Event",
      location: "Oslo",
    },
  ];

  return (
    <div className="flex flex-col p-4 h-screen bg-gray-800 text-white">
      {events.map((event, index) => {
        return (
          <div
            key={index}
            className="flex justify-between bg-gray-600 p-4 mb-4"
          >
            <div>
              <h1>Kickoff Event</h1>
              <p>Location</p>
            </div>
            <div>
              <p>lo</p>
              <p>go</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
