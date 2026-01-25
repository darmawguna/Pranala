export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

export interface WeddingInfo {
    bride_full_name?: string;
    bride_short_name?: string;
    bride_father_name?: string;
    bride_mother_name?: string;
    groom_full_name?: string;
    groom_short_name?: string;
    groom_father_name?: string;
    groom_mother_name?: string;
    event_date?: string;
    event_time?: string;
    event_timezone?: string;
    venue_name?: string;
    venue_address?: string;
    maps_embed_url?: string;
    cover_image?: string;
    bride_photo?: string;
    groom_photo?: string;
    music_url?: string;
    opening_text?: string;
    closing_text?: string;
    quote_text?: string;
}
