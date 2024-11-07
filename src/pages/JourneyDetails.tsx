import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CustomerJourney } from '@/types';

interface JourneyDetailsProps {
  journeys: CustomerJourney[];
  onEdit: (journey: CustomerJourney) => void;
}

export default function JourneyDetails({ journeys, onEdit }: JourneyDetailsProps) {
  const { id } = useParams();
  const journey = journeys.find(j => j.id === id);

  if (!journey) {
    return <div>Journey not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      <div className="space-y-8">
        <div className="relative rounded-xl overflow-hidden h-64">
          {journey.coverImage ? (
            <img
              src={journey.coverImage}
              alt={journey.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-orange-100 flex items-center justify-center">
              <span className="text-4xl text-orange-600">
                {journey.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{journey.name}</h1>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">{journey.brand}</Badge>
              <Badge variant="outline">{journey.persona}</Badge>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => onEdit(journey)}
            variant="outline"
            className="text-orange-600 border-orange-600 hover:bg-orange-50"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Journey
          </Button>
        </div>

        <div className="space-y-8">
          {journey.steps.map((step, index) => (
            <Card key={step.id} className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-semibold">
                      {index + 1}
                    </div>
                    <h2 className="text-xl font-semibold">{step.title}</h2>
                  </div>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <Badge variant="secondary" className="mb-4">{step.touchpoint}</Badge>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Satisfaction</p>
                      <p className="font-medium">{step.metrics.satisfaction}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Engagement</p>
                      <p className="font-medium">{step.metrics.engagement}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Conversion</p>
                      <p className="font-medium">{step.metrics.conversion}%</p>
                    </div>
                  </div>
                </div>
                {step.image && (
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}