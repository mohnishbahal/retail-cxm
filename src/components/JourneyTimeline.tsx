import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import type { CustomerJourney } from '@/types';

interface JourneyTimelineProps {
  journey: CustomerJourney;
}

export default function JourneyTimeline({ journey }: JourneyTimelineProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">{journey.name}</h3>
          <p className="text-sm text-gray-600">{journey.brand}</p>
        </div>
        <Badge>{journey.persona}</Badge>
      </div>

      <div className="space-y-6">
        {journey.steps.map((step, index) => (
          <div key={step.id} className="relative pl-8">
            {index !== journey.steps.length - 1 && (
              <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-gray-200" />
            )}
            <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-orange-100 border-2 border-orange-500 flex items-center justify-center">
              <span className="text-xs font-medium text-orange-700">{index + 1}</span>
            </div>
            <div>
              <h4 className="text-base font-medium mb-1">{step.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{step.description}</p>
              <div className="flex items-center gap-4">
                <Badge variant="outline">{step.touchpoint}</Badge>
                <span className="text-sm text-gray-500">
                  Satisfaction: {step.metrics.satisfaction}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}