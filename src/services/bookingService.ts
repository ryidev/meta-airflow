import { apiService } from './api';
import { Booking, CreateBookingData } from '../types';

export const bookingService = {
  async getBookings(): Promise<Booking[]> {
    return apiService.get<Booking[]>('/bookings');
  },

  async getBookingById(id: string): Promise<Booking> {
    return apiService.get<Booking>(`/bookings/${id}`);
  },

  async createBooking(data: CreateBookingData): Promise<Booking> {
    return apiService.post<Booking>('/bookings', data);
  },

  async cancelBooking(id: string): Promise<Booking> {
    return apiService.patch<Booking>(`/bookings/${id}/cancel`);
  },

  async getPropertyBookings(propertyId: string): Promise<Booking[]> {
    return apiService.get<Booking[]>(`/properties/${propertyId}/bookings`);
  },
};
