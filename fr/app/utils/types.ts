export interface MechanicAvailability {
    mon: string[];
    tue: string[];
    wed: string[];
    thu: string[];
    fri: string[];
    sat: string[];
    sun: string[];
}

export interface MechanicProfileType {
    id: number;
    business_name: string;
    job_title: string;
    web_site: string;
    business_info: string;
    heard_info: string;
    rating: number;
    availability: MechanicAvailability;
    years_of_experience: number | null;
    phone_number: string;
    address: string;
    zip_code: string;
    certifications: string;
    is_mobile: boolean;
    address_city: string;
    address_state: string;
    map_verified: string;
    address_latitude: string;
    address_longitude: string;
    distance?: number;
    offered_services: string[] | null;
    website?: string;
    business_description?: string;
}

export interface PaginatedMechanicProfileResponse extends PaginatedResponse<MechanicProfileType> {}

export interface PaginatedResponse<T> {
    total_items: number;
    total_pages: number;
    current_page: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface ValidationErrorResponse {
    [field: string]: string[];
}

export interface MechanicSignupData {   
        name: string;
        email: string;
        phoneNumber: string;
        businessName: string;
        businessHours: string;
        location: string; 
        password: string;
        confirmPassword: string;
      
  }

 export interface AccordionData {
    title: string;
    subItems: {
      title: string;
      services: {
        id: string;
        name: string;
      }[];
    }[];
  }
  

  export interface UserLocationMapProps {
    addressInput?: {
      fullAddress?: string;
    };
    addressfnc: () => void; 
  }

 export interface DayHours {
    day: string;
    startTime: string;
    endTime: string;
    isClosed: boolean;
  }

  
 // --- Types ---
export interface Business {
  id: number;
  business_name: string;
  full_address: string;
  city: string;
  state: string;
  zipcode: string;
  rating: number;
  total_reviews: number;
  phone?: string;
  business_email?: string;
}
  
export interface Quote {
  id: number;
  total_cost: number;
  estimate_details: string;
  created_at: string;
  status: 'pending' | 'accepted' | 'rejected';
  mechanic: Business;
}
  export interface ServiceRequestMechanic {
    id: number;
    status: 'pending' | 'quoted' | 'accepted' | 'completed' | 'rejected';
    created_at: string;
    updated_at: string;
    quote?: Quote;
    mechanic: Business;
  }
  
  export interface CustomerServiceRequest {
    id: number;
    created_at: string;
    status: 'pending' | 'quoted' | 'accepted' | 'completed' | 'canceled';
    vehicle_year: string;
    vehicle_make: string;
    vehicle_model: string;
    service_location: string;
    mechanics: ServiceRequestMechanic[];
    selected_services: string[];
    appointment_date: string;
    appointment_time: string;
    additional_info: string;
    zipcode?: string;        
    radio_status?: string;    
    mechanic_type?: string;   
  }
  
  export interface MechanicServiceRequest {
    id: number;
    status: 'pending' | 'quoted' | 'accepted' | 'completed' | 'rejected';
    created_at: string;
    service_request: {
      id: number;
      vehicle_year: string;
      vehicle_make: string;
      vehicle_model: string;
      service_location: string;
      selected_services: string[];
      appointment_date: string;
      appointment_time: string;
      user: {
        first_name: string;
        last_name: string;
      };
    };
    quote?: Quote;
  }
  
  export interface ServiceRequestCardProps {
    request: CustomerServiceRequest | MechanicServiceRequest;
    role: 'customer' | 'mechanic';
    onClick: () => void;
  }

  export interface Appointment {
    id: number;
    scheduled_date: string;
    customer_notes: string;
    mechanic_notes: string;
    is_completed: boolean;
    created_at: string;
    quote: Quote;
  }
  
  export interface Review {
    id: number;
    rating: number;
    review_text: string;
    created_at: string;
    mechanic: Business;
  }
  