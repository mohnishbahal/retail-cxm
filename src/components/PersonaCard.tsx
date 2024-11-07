import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import type { Persona } from '@/types';

interface PersonaCardProps {
  persona: Persona;
  onClick: () => void;
}

export default function PersonaCard({ persona, onClick }: PersonaCardProps) {
  return (
    <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">{persona.name}</h3>
          <p className="text-sm text-gray-600">{persona.demographics.occupation}</p>
        </div>
        <Badge variant="secondary">{persona.behaviors.loyaltyStatus}</Badge>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-700">Demographics</p>
          <p className="text-sm text-gray-600">
            {persona.demographics.ageRange} • {persona.demographics.location}
          </p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700">Preferences</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {persona.preferences.categories.map((category, index) => (
              <Badge key={index} variant="outline">{category}</Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}