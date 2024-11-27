export type Tables = {
  agents: {
    id: string;
    user_id: string | null;
    agent_name: string;
    company_name: string;
    company_description: string | null;
    default_timezone: string | null;
    tone_of_voice: string | null;
    allow_emoji_usage: boolean | null;
    emoji_limit: string | null;
    message_length: string | null;
    multistep_instructions: string | null;
    ask_for_help: boolean | null;
    no_personal_info: boolean | null;
    no_competitors: boolean | null;
    vapi_id: string | null;
    created_at: string | null;
    updated_at: string | null;
    default_voice: string | null;
    technical_skills: string | null;
    company_phone: string | null;
    company_website: string | null;
    role: string | null;
  };
  
  call_reports: {
    id: number;
    call_id: string;
    org_id: string;
    type: string;
    status: string;
    ended_reason: string;
    transcript: string | null;
    summary: string | null;
    messages: any | null;
    analysis: any | null;
    recording_url: string | null;
    stereo_recording_url: string | null;
    customer_number: string;
    assistant_name: string | null;
    assistant_model: string | null;
    assistant_transcriber: string | null;
    assistant_voice_provider: string | null;
    assistant_voice_id: string | null;
    phone_number: string | null;
    timestamp: string;
  };

  contacts: {
    id: string;
    user_id: string | null;
    first_name: string | null;
    last_name: string | null;
    phone: string | null;
    email_address: string | null;
    created_at: string | null;
    linkedin: string | null;
    position: string | null;
    company: string | null;
    company_phone: string | null;
    website: string | null;
    domain: string | null;
    facebook: string | null;
    twitter: string | null;
    linkedin_company_page: string | null;
    country: string | null;
    state: string | null;
    vertical: string | null;
    sub_category: string | null;
    notes: string | null;
    conversation_count: number | null;
    last_contacted: string | null;
    messages_sent_count: number | null;
    messages_received_count: number | null;
    opt_in_status: boolean | null;
    preferred_language: string | null;
  };
}