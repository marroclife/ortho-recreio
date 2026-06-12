export interface Specialty {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: string; // Used to pick correct Lucide icon
  tags: string[];
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  crm: string;
  specialtyId: string;
  avatar: string; // description for fallback or initials
  bio: string;
  availableDays: string[]; // ['Seg', 'Ter', 'Qua', 'Qui', 'Sex']
  availableHours: string[]; // ['09:00', '10:30', ...]
}

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  condition: string;
  quote: string;
  avatarSeed: string;
  rating: number;
}

export interface PostureQuestion {
  id: string;
  text: string;
  scoreImpact: number;
}
