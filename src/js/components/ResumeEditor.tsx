import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

import ConnectedResume from './ResumeSwitch';
import { setResumeJson, loadInitialState, setResumeLayout, setControl } from '../state/actions';

type ToolbarProps = {
    controls: {};
    loadInitialState: () => void;
    setResumeLayout: (layout: string) => void;
    setControl: (controlKey: string, controlValue: string) => void;
};

const Toolbar = ({ controls = {}, setControl, loadInitialState, setResumeLayout }: ToolbarProps) => (
    <nav>
        <div className='nav-container resume-editor__toolbar'>
            <div className='nav-logo'>
                <a href="/">resumeWeaver</a>
            </div>
            <ul className='nav-links'>
                <li className='dropdown'>
                    <a>Layout</a>
                    <ul className='menu'>
                        <li><a onClick={() => setResumeLayout('single')}>Single Column</a></li>
                        <li><a onClick={() => setResumeLayout('single-compact')}>Single Column Compact</a></li>
                        <li><a onClick={() => setResumeLayout('double')}>Double Column</a></li>
                    </ul>
                </li>
                <li className='dropdown'>
                    <a>Colors</a>
                    <ul className='menu'>
                        <li className='menu-item'>
                            <span>Primary</span>
                            <input type='text' value={controls['primaryColor']} onChange={(e) => setControl('primaryColor', e.target.value)} />
                            <span className='selected-color' title='Type in hex-code' style={{ backgroundColor: controls['primaryColor'] }} ></span>
                        </li>
                        <li className='menu-item'>
                            <span>Secondary</span>
                            <input type='text' value={controls['secondaryColor']} onChange={(e) => setControl('secondaryColor', e.target.value)} />
                            <span className='selected-color' title='Type in hex-code' style={{ backgroundColor: controls['secondaryColor'] }} ></span>
                        </li>
                    </ul>
                </li>
                <li><a onClick={() => {
                    const confirm = window.confirm('Reset back to original resume data?');
                    confirm && loadInitialState();
                }}>Reset</a></li>
                <li><Link className='btn btn-link btn-small' to='/resume'>View</Link></li>
            </ul>
        </div>
    </nav>
);

const ConnectedToolbar = connect(
    (state) => ({
        controls: state.controls,
    }),
    (dispatch) => ({
        loadInitialState: () => dispatch(loadInitialState()),
        setResumeLayout: (resumeLayoutKey) => dispatch(setResumeLayout(resumeLayoutKey)),
        setControl: (controlKey, controlValue) => dispatch(setControl(controlKey, controlValue)),
    })
)(Toolbar);

type ResumeEditorProps = {
    resumeJson: Record<string, any>;
    setResumeJson: (resumeJson: Record<string, any>) => void;
};

class ResumeEditor extends Component<ResumeEditorProps> {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(resumeJson) {
        try {
            resumeJson = JSON.parse(resumeJson);
            this.props.setResumeJson(resumeJson);
        } catch (e) {
            // do nothing
        }
    }

    render() {
        let { resumeJson } = this.props;
        resumeJson = JSON.stringify(resumeJson, null, 2);
        return (
            <div className='resume-editor'>
                <ConnectedToolbar />
                <div className='resume-split-screen'>
                    <div className='resume-editor__json'>
                        <AceEditor
                            mode="json"
                            theme="monokai"
                            name="code-editor"
                            onChange={this.onChange}
                            fontSize={14}
                            showPrintMargin={true}
                            showGutter={true}
                            highlightActiveLine={true}
                            value={resumeJson}
                            height={'100%'}
                            width={'100%'}
                            setOptions={{
                                enableBasicAutocompletion: false,
                                enableLiveAutocompletion: false,
                                enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: 2,
                            }}
                        />
                    </div>
                    <ConnectedResume
                        previewMode={true}
                    />
                </div>
            </div>
        );
    }
};

const ConnectedResumeEditor = connect(
    (state) => ({
        resumeJson: state.resumeJson,
    }),
    (dispatch) => ({
        setResumeJson: (resumeJson) => dispatch(setResumeJson(resumeJson)),
    }),
)(ResumeEditor);

export default ConnectedResumeEditor;
