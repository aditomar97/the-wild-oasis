import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";
const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        fitlerField={"discount"}
        options={[
          { label: "All", value: "all" },
          { label: "No discount", value: "no-discount" },
          { label: "With discount", value: "with-discount" },
        ]}
      />
      <SortBy
        options={[
          { label: "Sort by name A-Z", value: "name-asc" },
          { label: "Sort by name Z-A", value: "name-dsc" },
          {
            label: "Sort by price (low first)",
            value: "regularPrice-asc",
          },
          {
            label: "Sort by price (high first)",
            value: "regularPrice-dsc",
          },
          {
            label: "Sort by maxCapacity(low first)",
            value: "maxCapacity-asc",
          },
          {
            label: "Sort by maxCapacity(high first)",
            value: "maxCapacity-dsc",
          },
        ]}
      />
    </TableOperations>
  );
};
export default CabinTableOperations;
