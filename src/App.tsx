import AzureMaps from "./components/AzureMaps";

const PARKINGS = [
  {
    id: 1,
    name: "Parking One",
    position: [-122.33, 47.6],
    address: "123 Main St, City, State",
  },
  {
    id: 2,
    name: "Parking Two",
    position: [-122.4, 47.55],
    address: "456 Elm St, City, State",
  },
  {
    id: 3,
    name: "Parking Three",
    position: [-122.3, 47.65],
    address: "789 Maple St, City, State",
  },
  {
    id: 4,
    name: "Parking Four",
    position: [-122.5, 47.7],
    address: "321 Oak St, City, State",
  },
  {
    id: 5,
    name: "Parking Five",
    position: [-122.35, 47.75],
    address: "654 Pine St, City, State",
  },
];

const App = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/3 overflow-auto bg-gray-100 p-4">
        {PARKINGS.map((parking) => (
          <div key={parking.id} className="bg-white m-2 p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold">{parking.name}</h2>
            <p>{parking.address}</p>
          </div>
        ))}
      </div>
      <div className="w-2/4 h-full">
        <AzureMaps
          subscriptionKey={import.meta.env.AZURE_SUBSCRIPTION_KEY}
          parkings={PARKINGS}
        />
      </div>
    </div>
  );
};

export default App;
