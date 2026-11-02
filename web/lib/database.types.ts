export type Profile = { id: string; first_name: string; last_name: string; display_name: string; avatar_url: string | null; created_at: string; updated_at: string };
export type Decision = { id: string; organizer_id: string; title: string; created_at: string };
export type Participant = { id: string; decision_id: string; user_id: string | null; first_name: string; last_name: string | null; invited_email: string | null; invited_phone: string | null; invite_status: 'pending' | 'joined' | 'revoked'; invited_at: string; joined_at: string | null };
export type Perspective = { id: string; decision_id: string; participant_id: string; body: string; created_at: string };
type Table<Row, Insert> = { Row: Row; Insert: Insert; Update: Partial<Insert>; Relationships: [] };
export type Database = { public: {
 Tables: {
 profiles: Table<Profile, Pick<Profile, 'id' | 'first_name' | 'last_name'> & Partial<Omit<Profile, 'id' | 'first_name' | 'last_name'>>>;
 decisions: Table<Decision, Pick<Decision, 'organizer_id' | 'title'> & Partial<Pick<Decision, 'id' | 'created_at'>>>;
 decision_participants: Table<Participant, Pick<Participant, 'decision_id' | 'first_name'> & Partial<Omit<Participant, 'decision_id' | 'first_name'>>>;
 perspectives: Table<Perspective, Pick<Perspective, 'decision_id' | 'participant_id' | 'body'> & Partial<Pick<Perspective, 'id' | 'created_at'>>>;
 }; Views: Record<string, never>; Enums: Record<string, never>; CompositeTypes: Record<string, never>;
 Functions: { participant_labels: {Args: {target: string}; Returns: {id: string; display_name: string}[]}; invite_preview: { Args: {target: string}; Returns: {first_name: string; last_name: string | null}[] }; claim_participant: {Args: {target: string}; Returns: string} };
} };
