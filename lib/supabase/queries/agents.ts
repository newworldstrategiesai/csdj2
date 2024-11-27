import { supabase } from '../config';
import type { Tables } from '../types';

export const agentQueries = {
  getAll: async (userId: string) => {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('user_id', userId);
      
    if (error) throw error;
    return data;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  },

  create: async (agent: Partial<Tables['agents']>) => {
    const { data, error } = await supabase
      .from('agents')
      .insert([agent])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  update: async (id: string, updates: Partial<Tables['agents']>) => {
    const { data, error } = await supabase
      .from('agents')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('agents')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  }
};