import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Persona } from '@/types';

interface PersonaDetailsProps {
  personas: Persona[];
  onEdit: (persona: Persona) => void;
}

export default function PersonaDetails({ personas, onEdit }: PersonaDetailsProps) {
  const { id } = useParams();
  const persona = personas.find(p => p.id === id);

  if (!persona) {
    return <div>Persona not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="p-6">
            <div className="text-center mb-6">
              {persona.avatar ? (
                <img
                  src={persona.avatar}
                  alt={persona.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-orange-100 flex items-center justify-center">
                  <span className="text-4xl text-orange-600">
                    {persona.name.charAt(0)}
                  </span>
                </div>
              )}
              <h1 className="text-2xl font-bold">{persona.name}</h1>
              <p className="text-gray-600">{persona.demographics.occupation}</p>
            </div>

            <Button
              onClick={() => onEdit(persona)}
              variant="outline"
              className="w-full"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Persona
            </Button>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Demographics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Age Range</p>
                <p className="font-medium">{persona.demographics.ageRange}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Income</p>
                <p className="font-medium">{persona.demographics.income}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium">{persona.demographics.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Occupation</p>
                <p className="font-medium">{persona.demographics.occupation}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Preferences</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Preferred Brands</p>
                <div className="flex flex-wrap gap-2">
                  {persona.preferences.brands.map((brand, index) => (
                    <Badge key={index} variant="secondary">{brand}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Shopping Categories</p>
                <div className="flex flex-wrap gap-2">
                  {persona.preferences.categories.map((category, index) => (
                    <Badge key={index} variant="outline">{category}</Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Price Range</p>
                  <p className="font-medium">{persona.preferences.priceRange}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Shopping Frequency</p>
                  <p className="font-medium">{persona.preferences.shoppingFrequency}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Behaviors</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Purchase Drivers</p>
                <div className="flex flex-wrap gap-2">
                  {persona.behaviors.purchaseDrivers.map((driver, index) => (
                    <Badge key={index}>{driver}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Channel Preferences</p>
                <div className="flex flex-wrap gap-2">
                  {persona.behaviors.channelPreferences.map((channel, index) => (
                    <Badge key={index} variant="secondary">{channel}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Loyalty Status</p>
                <Badge variant="outline" className="mt-1">
                  {persona.behaviors.loyaltyStatus}
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}