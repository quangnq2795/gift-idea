import ScrollBar from "@/components/scrollbar/ScrollBar";
import { AdPanelHomeMain } from "@/components/ads/AdPanelHomeMain";
import AdPanelHomeSub from "@/components/ads/AdPanelHomeSub";
export default function Home() {
  return (
    <div>
      <AdPanelHomeMain />
      <div className="my-4" />
      <AdPanelHomeSub />
      <div className="my-4" />
      <ScrollBar />
    </div>
  );
}
