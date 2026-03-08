export interface Document {
    id: string;
    user_id: string;
    file_name: string;
    storage_path: string;
    category: string;
    summary: string;
    created_at: string;
}

export type Category =
    | 'Invoice'
    | 'Resume'
    | 'Legal'
    | 'Academic'
    | 'Medical'
    | 'Financial'
    | 'Personal'
    | 'Other';
