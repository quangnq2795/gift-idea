import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import StoreProduct from "./StoreProduct";
import { StoreStatistical } from "./StoreStatistical";
import { StorePanel } from "./StorePanel";
import { StoreDescription } from "./StoreDescription";
import { useMemo } from "react";

export default function Store({ storeId }: { storeId: string }) {
  // Memoize the tabs array to avoid re-creating it on each render
  const tabs = useMemo(
    () => [
      {
        id: "Products",
        label: "Products",
        content: <StoreProduct storeId={storeId} />,
      },
      {
        id: "Statistical",
        label: "Statistical",
        content: <StoreStatistical storeId={storeId} />,
      },
    ],
    [storeId] // Recompute only if storeId changes
  );

  if (!storeId) {
    return <p className="text-red-500">Invalid store ID.</p>;
  }

  return (
    <div className="flex w-full flex-col">
      <div className="mb-4">
        <StorePanel storeId={storeId} />
      </div>
      <StoreDescription storeId={storeId} />
      <div>
        <Tabs aria-label="Store Tabs" radius="none">
          {tabs.map(({ id, label, content }) => (
            <Tab key={id} title={label}>
              <Card>
                <CardBody>{content}</CardBody>
              </Card>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
