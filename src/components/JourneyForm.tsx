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
import type { CustomerJourney, JourneyStep } from '../types';

interface JourneyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (journey: Partial<CustomerJourney>) => void;
  initialData?: Partial<CustomerJourney>;
}

export default function JourneyForm({ open, onOpenChange, onSubmit, initialData }: JourneyFormProps) {
  const [formData, setFormData] = React.useState<Partial<CustomerJourney>>(initialData || {
    name: '',
    brand: '',
    persona: '',
    coverImage: '',
    steps: []
  });

  const [currentStep, setCurrentStep] = React.useState<Partial<JourneyStep>>({
    title: '',
    description: '',
    touchpoint: '',
    image: '',
    metrics: {
      satisfaction: 0,
      engagement: 0,
      conversion: 0
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onOpenChange(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCoverImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, coverImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleStepImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentStep(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleAddStep = () => {
    if (currentStep.title && currentStep.description) {
      setFormData(prev => ({
        ...prev,
        steps: [...(prev.steps || []), { ...currentStep, id: Date.now().toString() }]
      }));
      setCurrentStep({
        title: '',
        description: '',
        touchpoint: '',
        image: '',
        metrics: {
          satisfaction: 0,
          engagement: 0,
          conversion: 0
        }
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{initialData ? 'Edit Journey' : 'Create New Journey'}</DialogTitle>
            <DialogDescription>
              Create a new customer journey by adding steps and touchpoints.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cover Image</label>
              <div className="flex items-center gap-4">
                {formData.coverImage ? (
                  <img
                    src={formData.coverImage}
                    alt="Cover preview"
                    className="w-32 h-20 rounded object-cover"
                  />
                ) : (
                  <div className="w-32 h-20 rounded bg-orange-100 flex items-center justify-center">
                    <ImagePlus className="w-6 h-6 text-orange-600" />
                  </div>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Journey Name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter journey name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Brand</label>
                <Input
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Enter brand name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Persona</label>
                <Input
                  name="persona"
                  value={formData.persona}
                  onChange={handleChange}
                  placeholder="Select persona"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Journey Steps</h3>
              {formData.steps?.map((step, index) => (
                <div key={step.id} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-medium">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="font-medium">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  {step.image && (
                    <img
                      src={step.image}
                      alt={step.title}
                      className="mt-2 rounded h-32 object-cover"
                    />
                  )}
                </div>
              ))}

              <div className="space-y-2 border rounded-lg p-4">
                <Input
                  placeholder="Step title"
                  value={currentStep.title}
                  onChange={e => setCurrentStep(prev => ({ ...prev, title: e.target.value }))}
                />
                <Input
                  placeholder="Step description"
                  value={currentStep.description}
                  onChange={e => setCurrentStep(prev => ({ ...prev, description: e.target.value }))}
                />
                <Input
                  placeholder="Touchpoint"
                  value={currentStep.touchpoint}
                  onChange={e => setCurrentStep(prev => ({ ...prev, touchpoint: e.target.value }))}
                />
                <div className="flex items-center gap-4">
                  {currentStep.image ? (
                    <img
                      src={currentStep.image}
                      alt="Step preview"
                      className="w-32 h-20 rounded object-cover"
                    />
                  ) : (
                    <div className="w-32 h-20 rounded bg-orange-100 flex items-center justify-center">
                      <ImagePlus className="w-6 h-6 text-orange-600" />
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleStepImageChange}
                    className="flex-1"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddStep}
                  className="w-full mt-4"
                >
                  Add Step
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              {initialData ? 'Update Journey' : 'Create Journey'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}