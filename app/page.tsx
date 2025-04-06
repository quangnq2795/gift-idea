import ScrollBar from "@/components/scrollbar/ScrollBar";
import { AdPanelT } from "@/components/ads/AdPanelT";

export default function Home() {
  return (
    <div>
      <AdPanelT />
      <div className="my-8" />
      <ScrollBar />
    </div>
  );
}
