import { supabase } from '../config';
import type { Tables } from '../types';

export const callReportQueries = {
  getAll: async (orgId: string) => {
    const { data, error } = await supabase
      .from('call_reports')
      .select('*')
      .eq('org_id', orgId)
      .order('timestamp', { ascending: false });
      
    if (error) throw error;
    return data;
  },

  getById: async (id: number) => {
    const { data, error } = await supabase
      .from('call_reports')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  },

  create: async (report: Partial<Tables['call_reports']>) => {
    const { data, error } = await supabase
      .from('call_reports')
      .insert([report])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  update: async (id: number, updates: Partial<Tables['call_reports']>) => {
    const { data, error } = await supabase
      .from('call_reports')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
};