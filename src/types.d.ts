type ContactProps = {
    text: string;
    url?: string;
    icon?: string;
};

export type Item = {
    title: string;
    subtitle: string;
    description: string;
    date: string;
    link?: string;
};

export type SectionData = {
    data: Item[];
    title: string;
};

export type SectionProps = {
    sectionData: SectionData;
    primaryColor: string;
    compact?: boolean;
};

export type ResumeData = {
    resumeJson: {
        profile: Record<string, any>;
        sections: SectionData[];
        skills: string[];
    };
    resumeLayoutKey: string;
    controls: {
        primaryColor: string;
        secondaryColor: string;
    };
};

// Extra keys for the component
export type ResumeComponent = ResumeData & {
    compact: boolean;
    previewMode: boolean;
};
