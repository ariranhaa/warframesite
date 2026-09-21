import MeleeCard from "@/components/Cards/MeleeCard";
import PrimaryCard from "@/components/Cards/PrimaryCard";
import SecondaryCard from "@/components/Cards/SecondaryCard";
import WarframeCard from "@/components/Cards/WarframeCard";

export default function Builds() {
  return (
    <div className="group flex h-[500px] w-full gap-3">
      <PrimaryCard />
      <SecondaryCard />
      <MeleeCard />
      <WarframeCard />
    </div>
  );
}
