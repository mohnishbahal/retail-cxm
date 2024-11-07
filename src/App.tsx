import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import PersonaCard from './components/PersonaCard';
import JourneyTimeline from './components/JourneyTimeline';
import MobileNav from './components/MobileNav';
import DataWidget from './components/DataWidget';
import EngagementChart from './components/EngagementChart';
import ConversionChart from './components/ConversionChart';
import PersonaForm from './components/PersonaForm';
import JourneyForm from './components/JourneyForm';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { PlusCircle, Search, Users, ShoppingBag, TrendingUp, Target } from 'lucide-react';
import type { Persona, CustomerJourney } from './types';

const samplePersonas: Persona[] = [
  {
    id: '1',
    name: 'Urban Professional Sarah',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=80',
    demographics: {
      ageRange: '28-35',
      income: '$75,000-$100,000',
      location: 'Metropolitan Area',
      occupation: 'Marketing Manager'
    },
    preferences: {
      brands: ['Lifestyle Co', 'Modern Home', 'Fashion Forward'],
      categories: ['Home Office', 'Casual Wear', 'Home Decor'],
      priceRange: 'Premium',
      shoppingFrequency: 'Bi-weekly'
    },
    behaviors: {
      purchaseDrivers: ['Quality', 'Design', 'Sustainability'],
      channelPreferences: ['Mobile App', 'Physical Store'],
      loyaltyStatus: 'Gold Member'
    }
  },
  {
    id: '2',
    name: 'Tech Enthusiast Alex',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&auto=format&fit=crop&q=80',
    demographics: {
      ageRange: '25-32',
      income: '$90,000-$120,000',
      location: 'Tech Hub City',
      occupation: 'Software Developer'
    },
    preferences: {
      brands: ['TechGear', 'SmartLife', 'FutureWear'],
      categories: ['Electronics', 'Smart Home', 'Activewear'],
      priceRange: 'High-end',
      shoppingFrequency: 'Monthly'
    },
    behaviors: {
      purchaseDrivers: ['Innovation', 'Performance', 'Brand'],
      channelPreferences: ['Online', 'Mobile App'],
      loyaltyStatus: 'Platinum'
    }
  }
];

const sampleJourneys: CustomerJourney[] = [
  {
    id: '1',
    name: 'Home Office Setup Journey',
    brand: 'Modern Home',
    persona: 'Urban Professional Sarah',
    coverImage: 'https://images.unsplash.com/photo-1486946255434-2466348c2166?w=1200&auto=format&fit=crop&q=80',
    steps: [
      {
        id: 's1',
        title: 'Initial Research',
        description: 'Customer browses home office furniture on mobile app',
        touchpoint: 'Mobile App',
        image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&auto=format&fit=crop&q=80',
        metrics: { satisfaction: 85, engagement: 90, conversion: 60 }
      },
      {
        id: 's2',
        title: 'Store Visit',
        description: 'Customer visits physical store for product testing',
        touchpoint: 'Physical Store',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
        metrics: { satisfaction: 92, engagement: 88, conversion: 75 }
      },
      {
        id: 's3',
        title: 'Purchase Decision',
        description: 'Customer completes purchase through mobile app',
        touchpoint: 'Mobile App',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop&q=80',
        metrics: { satisfaction: 95, engagement: 95, conversion: 100 }
      }
    ],
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T15:30:00Z'
  }
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [personas, setPersonas] = useState<Persona[]>(samplePersonas);
  const [journeys, setJourneys] = useState<CustomerJourney[]>(sampleJourneys);
  const [personaFormOpen, setPersonaFormOpen] = useState(false);
  const [journeyFormOpen, setJourneyFormOpen] = useState(false);

  const handleCreatePersona = (persona: Partial<Persona>) => {
    const newPersona = {
      ...persona,
      id: Date.now().toString()
    } as Persona;
    setPersonas(prev => [...prev, newPersona]);
  };

  const handleCreateJourney = (journey: Partial<CustomerJourney>) => {
    const newJourney = {
      ...journey,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as CustomerJourney;
    setJourneys(prev => [...prev, newJourney]);
  };

  const filteredPersonas = personas.filter(persona =>
    persona.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredJourneys = journeys.filter(journey =>
    journey.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden">
        <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">RetailCXM</h1>
          <MobileNav />
        </header>
      </div>

      <div className="hidden lg:block">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      
      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-800">Customer Experience Dashboard</h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              <Button onClick={() => setJourneyFormOpen(true)} className="animate-pulse-subtle">
                <PlusCircle className="mr-2 h-5 w-5" />
                New Journey
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Total Customers",
                value: "12,345",
                change: 8.2,
                icon: <Users size={24} className="text-orange-600" />
              },
              {
                title: "Sales Revenue",
                value: "$534,267",
                change: 12.5,
                icon: <ShoppingBag size={24} className="text-orange-600" />
              },
              {
                title: "Engagement Rate",
                value: "64.8%",
                change: -2.4,
                icon: <TrendingUp size={24} className="text-orange-600" />
              },
              {
                title: "Conversion Rate",
                value: "28.6%",
                change: 5.3,
                icon: <Target size={24} className="text-orange-600" />
              }
            ].map((widget, index) => (
              <div
                key={widget.title}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <DataWidget {...widget} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
              <EngagementChart />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
              <ConversionChart />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">Active Personas</h2>
                <Button
                  variant="outline"
                  onClick={() => setPersonaFormOpen(true)}
                  className="text-orange-600 border-orange-600 hover:bg-orange-50"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Persona
                </Button>
              </div>
              {filteredPersonas.map((persona, index) => (
                <div
                  key={persona.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <PersonaCard
                    persona={persona}
                    onClick={() => console.log('Persona clicked', persona.id)}
                  />
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Current Journey</h2>
              {filteredJourneys.map((journey, index) => (
                <div
                  key={journey.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                >
                  <JourneyTimeline journey={journey} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <PersonaForm
        open={personaFormOpen}
        onOpenChange={setPersonaFormOpen}
        onSubmit={handleCreatePersona}
      />

      <JourneyForm
        open={journeyFormOpen}
        onOpenChange={setJourneyFormOpen}
        onSubmit={handleCreateJourney}
      />
    </div>
  );
}

export default App;