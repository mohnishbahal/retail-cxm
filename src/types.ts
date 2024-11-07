export interface Demographics {
  ageRange: string;
  income: string;
  location: string;
  occupation: string;
}

export interface Preferences {
  brands: string[];
  categories: string[];
  priceRange: string;
  shoppingFrequency: string;
}

export interface Behaviors {
  purchaseDrivers: string[];
  channelPreferences: string[];
  loyaltyStatus: string;
}

export interface Persona {
  id: string;
  name: string;
  avatar?: string;
  demographics: Demographics;
  preferences: Preferences;
  behaviors: Behaviors;
}

export interface JourneyStep {
  id: string;
  title: string;
  description: string;
  touchpoint: string;
  image?: string;
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
  coverImage?: string;
  steps: JourneyStep[];
  createdAt: string;
  updatedAt: string;
}