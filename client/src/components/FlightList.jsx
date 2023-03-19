import FlightCard from "./FlightCard";

function FlightList({ flights }) {
  return (
    <div className="flight-list" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {flights.map((flight) => (
        <FlightCard key={flight._id} flight={flight} />
      ))}
    </div>
  );
}
export default FlightList;