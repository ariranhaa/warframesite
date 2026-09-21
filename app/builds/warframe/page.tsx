import { getWarframes } from "@/lib/warframe-api";
import WarframeCard from "@/components/Cards/WarframeBuildCard";

export default async function WarframesPage() {
  const warframes = await getWarframes();

  const onlyWarframes = warframes.filter(
    (warframe) =>
      warframe.category === "Warframes" &&
      warframe.type === "Warframe" &&
      warframe.productCategory === "Suits",
  );

  console.log(
    warframes
      .filter((warframe) => warframe.type === "Archwing")
      .map((warframe) => ({
        name: warframe.name,
        category: warframe.category,
        type: warframe.type,
        productCategory: warframe.productCategory,
        uniqueName: warframe.uniqueName,
      })),
  );

  return (
    <div>
      <h1 className="mb-6 text-4xl font-bold">Warframes</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {onlyWarframes.map((warframe) => (
          <WarframeCard key={warframe.uniqueName} warframe={warframe} />
        ))}
      </div>
    </div>
  );
}
