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
    link: string;
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

export type ResumeComponent = {
    resumeJson: {
        profile: Record<string, any>;
        sections: SectionData[];
        skills: string[];
    };
    controls: {
        primaryColor: string;
        secondaryColor: string;
    };
    compact: boolean;
    previewMode: boolean;
};
