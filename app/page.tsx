import ScrollBar from "@/components/scrollbar/ScrollBar";
import { AdPanelHomeMain } from "@/components/ads/AdPanelHomeMain";
import AdPanelHomeSub from "@/components/ads/AdPanelHomeSub";
import FastSearch from "@/components/common/FastSearch";
export default function Home() {
  return (
    <div>
      <AdPanelHomeMain />
      <div className="my-4" />
      <AdPanelHomeSub />
      <div className="my-4" />
      <FastSearch />
      <div className="my-4" />
      <ScrollBar />
    </div>
  );
}
