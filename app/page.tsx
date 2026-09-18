import BuildCard from "@/components/BuildMainCard";
import MyBuildCard from "@/components/MyBuilds";

export default function Home() {
  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <BuildCard />
      </div>

      <div className="flex-1">
        <MyBuildCard />
      </div>
    </div>
  );
}
