import React, { useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImagePlus } from 'lucide-react';
import type { Persona } from '../types';

interface PersonaFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (persona: Partial<Persona>) => void;
  initialData?: Partial<Persona>;
}

export default function PersonaForm({ open, onOpenChange, onSubmit, initialData }: PersonaFormProps) {
  const [formData, setFormData] = React.useState<Partial<Persona>>(initialData || {
    name: '',
    avatar: '',
    demographics: {
      ageRange: '',
      income: '',
      location: '',
      occupation: ''
    },
    preferences: {
      brands: [],
      categories: [],
      priceRange: '',
      shoppingFrequency: ''
    },
    behaviors: {
      purchaseDrivers: [],
      channelPreferences: [],
      loyaltyStatus: ''
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onOpenChange(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof Persona],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{initialData ? 'Edit Persona' : 'Create New Persona'}</DialogTitle>
            <DialogDescription>
              Fill in the details below to {initialData ? 'update' : 'create'} a customer persona.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Avatar</label>
              <div className="flex items-center gap-4">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Avatar preview"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                    <ImagePlus className="w-6 h-6 text-orange-600" />
                  </div>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Rest of the form fields remain the same */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter persona name"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Demographics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Age Range</label>
                  <Input
                    name="demographics.ageRange"
                    value={formData.demographics?.ageRange}
                    onChange={handleChange}
                    placeholder="e.g., 25-34"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Income</label>
                  <Input
                    name="demographics.income"
                    value={formData.demographics?.income}
                    onChange={handleChange}
                    placeholder="e.g., $50,000-$75,000"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    name="demographics.location"
                    value={formData.demographics?.location}
                    onChange={handleChange}
                    placeholder="Enter location"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Occupation</label>
                  <Input
                    name="demographics.occupation"
                    value={formData.demographics?.occupation}
                    onChange={handleChange}
                    placeholder="Enter occupation"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Preferences</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Price Range</label>
                  <Input
                    name="preferences.priceRange"
                    value={formData.preferences?.priceRange}
                    onChange={handleChange}
                    placeholder="e.g., Premium"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Shopping Frequency</label>
                  <Input
                    name="preferences.shoppingFrequency"
                    value={formData.preferences?.shoppingFrequency}
                    onChange={handleChange}
                    placeholder="e.g., Weekly"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              {initialData ? 'Update Persona' : 'Create Persona'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}