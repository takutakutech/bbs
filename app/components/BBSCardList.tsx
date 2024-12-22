import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import BBSCard from './BBSCard';
import { BBSData } from '../types/types';

interface BBSALLDATAProps {
    bbsAllData: BBSData[]
};

const BBSCardList = ({bbsAllData}: BBSALLDATAProps) => {
  return (
    <div className="grid lg:grid-cols-3 px-4 py-4 gap-4">
        {bbsAllData.map((bbsData: BBSData) => (
            <BBSCard key={bbsData.id} bbsData={bbsData}/>
        ))}
    </div>
  )
}

export default BBSCardList;