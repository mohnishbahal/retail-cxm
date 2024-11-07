export interface Persona {
  id: string;
  name: string;
  demographics: {
    ageRange: string;
    income: string;
    location: string;
    occupation: string;
  };
  preferences: {
    brands: string[];
    categories: string[];
    priceRange: string;
    shoppingFrequency: string;
  };
  behaviors: {
    purchaseDrivers: string[];
    channelPreferences: string[];
    loyaltyStatus: string;
  };
}

export interface JourneyStep {
  id: string;
  title: string;
  description: string;
  touchpoint: string;
  metrics: {
    satisfaction: number;
    engagement: number;
    conversion: number;
  };
}

export interface CustomerJourney {
  id: string;
  name: string;
  brand: string;
  persona: string;
  steps: JourneyStep[];
  createdAt: string;
  updatedAt: string;
}