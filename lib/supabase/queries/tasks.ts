import { supabase } from '../config';
import type { Task } from '@/lib/types';

export const taskQueries = {
  getAll: async (userId: string) => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  },

  create: async (task: Partial<Task>) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert([task])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  update: async (id: string, updates: Partial<Task>) => {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  }
};