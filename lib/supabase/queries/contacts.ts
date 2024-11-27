import { supabase } from '../config';
import type { Tables } from '../types';

export const contactQueries = {
  getAll: async (userId: string) => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('user_id', userId);
      
    if (error) throw error;
    return data;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  },

  create: async (contact: Partial<Tables['contacts']>) => {
    const { data, error } = await supabase
      .from('contacts')
      .insert([contact])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  update: async (id: string, updates: Partial<Tables['contacts']>) => {
    const { data, error } = await supabase
      .from('contacts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  }
};