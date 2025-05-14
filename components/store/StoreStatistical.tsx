import React from 'react';
import { DailyTrafficChart } from "@/components/chart/DailyTrafficChart";
import { MonthlyTrafficChart } from "@/components/chart/MonthlyTrafficChart";

export const StoreStatistical = ({ storeId }: { storeId: string }) => {
    return (
        <div>
          <DailyTrafficChart/>
          <MonthlyTrafficChart/>
        </div>
    );
}