export const SET_RESUME_JSON = 'SET_RESUME_JSON';
export const LOAD_INITIAL_STATE = 'LOAD_INITIAL_STATE';
export const SET_RESUME_LAYOUT = 'SET_RESUME_LAYOUT';
export const SET_CONTROL = 'SET_CONTROL';

export const setResumeJson = (resumeJson) => ({
    type: SET_RESUME_JSON,
    resumeJson,
});

export const loadInitialState = () => ({
    type: LOAD_INITIAL_STATE,
});

export const setResumeLayout = (resumeLayoutKey) => ({
    type: SET_RESUME_LAYOUT,
    resumeLayoutKey,
});

export const setControl = (controlKey, controlValue) => ({
    type: SET_CONTROL,
    controlKey,
    controlValue,
});
